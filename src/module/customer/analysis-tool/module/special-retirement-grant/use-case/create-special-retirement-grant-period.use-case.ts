import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SpecialRetirementGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period/command/special-retirement-grant-period.command.repository.gateway';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/special-retirement-grant-period.entity';
import { CreateSpecialRetirementGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/request/create-special-retirement-grant-period.request.dto';
import { CreateSpecialRetirementGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/create-special-retirement-grant-period.response.dto';
import { SpecialRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateSpecialRetirementGrantPeriodUseCase {
  protected readonly _type = CreateSpecialRetirementGrantPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantPeriodCommandRepositoryGateway)
    private readonly specialRetirementGrantPeriodCommandRepositoryGateway: SpecialRetirementGrantPeriodCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialRetirementGrantId: SpecialRetirementGrantId,
    dto: CreateSpecialRetirementGrantPeriodRequestDto,
  ): Promise<CreateSpecialRetirementGrantPeriodResponseDto> {
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

    const period = new SpecialRetirementGrantPeriodEntity({
      employmentRelationshipSource: dto.employmentRelationshipSource ?? null,
      startDate: dto.startDate ?? null,
      endDate: dto.endDate ?? null,
      category: dto.category ?? null,
      status: dto.status ?? null,
      averageContributionAmount: dto.averageContributionAmount ?? null,
      shouldConsiderPeriod: dto.shouldConsiderPeriod ?? true,
      shouldConsiderLastRemunerationAsExitDate:
        dto.shouldConsiderLastRemunerationAsExitDate ?? false,
      cnisDocument: grant.cnisDocument,
      specialRetirementGrant: grant,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.specialRetirementGrantPeriodCommandRepositoryGateway.createSpecialRetirementGrantPeriod(
        period,
      ),
    ]);
    await transaction.commit();

    return CreateSpecialRetirementGrantPeriodResponseDto.build({
      specialRetirementGrantPeriodId: period.id,
    });
  }
}
