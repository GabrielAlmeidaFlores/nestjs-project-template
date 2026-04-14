import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SpecialRetirementGrantEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-earnings-history/command/special-retirement-grant-earnings-history.command.repository.gateway';
import { SpecialRetirementGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period/command/special-retirement-grant-period.command.repository.gateway';
import { SpecialRetirementGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period/query/special-retirement-grant-period.query.repository.gateway';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantEarningsHistoryEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-earnings-history/special-retirement-grant-earnings-history.entity';
import { SpecialRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/special-retirement-grant-period.entity';
import { UpdateSpecialRetirementGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/request/update-special-retirement-grant-period.request.dto';
import { UpdateSpecialRetirementGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/update-special-retirement-grant-period.response.dto';
import { SpecialRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateSpecialRetirementGrantPeriodUseCase {
  protected readonly _type = UpdateSpecialRetirementGrantPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantPeriodQueryRepositoryGateway)
    private readonly specialRetirementGrantPeriodQueryRepositoryGateway: SpecialRetirementGrantPeriodQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantPeriodCommandRepositoryGateway)
    private readonly specialRetirementGrantPeriodCommandRepositoryGateway: SpecialRetirementGrantPeriodCommandRepositoryGateway,
    @Inject(SpecialRetirementGrantEarningsHistoryCommandRepositoryGateway)
    private readonly specialRetirementGrantEarningsHistoryCommandRepositoryGateway: SpecialRetirementGrantEarningsHistoryCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialRetirementGrantId: SpecialRetirementGrantId,
    dto: UpdateSpecialRetirementGrantPeriodRequestDto,
  ): Promise<UpdateSpecialRetirementGrantPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const record =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialRetirementGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialRetirementGrantNotFoundError,
      );

    if (record.specialRetirementGrant === null) {
      throw new SpecialRetirementGrantNotFoundError();
    }

    const grant = new SpecialRetirementGrantEntity({
      ...record.specialRetirementGrant,
      specialRetirementGrantResult: null,
      specialRetirementGrantBenefit: null,
      specialRetirementGrantLegalProceeding: null,
      specialRetirementGrantDocument: null,
      createdBy: record.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const existingIds =
      await this.specialRetirementGrantPeriodQueryRepositoryGateway.listIdsBySpecialRetirementGrantId(
        specialRetirementGrantId,
      );

    const deleteTransactions = existingIds.map((id) =>
      this.specialRetirementGrantPeriodCommandRepositoryGateway.deleteSpecialRetirementGrantPeriod(
        id,
      ),
    );

    const createTransactions = dto.periods.flatMap((p) => {
      const entity = new SpecialRetirementGrantPeriodEntity({
        employmentRelationshipSource: p.employmentRelationshipSource ?? null,
        startDate: p.startDate ?? null,
        endDate: p.endDate ?? null,
        category: p.category ?? null,
        status: p.status ?? null,
        averageContributionAmount: p.averageContributionAmount ?? null,
        shouldConsiderPeriod: p.shouldConsiderPeriod ?? true,
        shouldConsiderLastRemunerationAsExitDate:
          p.shouldConsiderLastRemunerationAsExitDate ?? false,
        cnisDocument: grant.cnisDocument,
        specialRetirementGrant: grant,
      });

      const periodTx =
        this.specialRetirementGrantPeriodCommandRepositoryGateway.createSpecialRetirementGrantPeriod(
          entity,
        );

      const earningsTx = (p.earningsHistory ?? []).map((eh) =>
        this.specialRetirementGrantEarningsHistoryCommandRepositoryGateway.createSpecialRetirementGrantEarningsHistory(
          new SpecialRetirementGrantEarningsHistoryEntity({
            competence: eh.competence ?? null,
            remuneration: eh.remuneration ?? null,
            indicators: eh.indicators ?? null,
            paymentDate: eh.paymentDate ?? null,
            competenceBelowTheMinimum: eh.competenceBelowTheMinimum ?? null,
            specialRetirementGrant: grant,
            specialRetirementGrantPeriod: entity,
          }),
        ),
      );

      return [periodTx, ...earningsTx];
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      ...deleteTransactions,
      ...createTransactions,
    ]);
    await transaction.commit();

    return UpdateSpecialRetirementGrantPeriodResponseDto.build({
      success: true,
    });
  }
}
