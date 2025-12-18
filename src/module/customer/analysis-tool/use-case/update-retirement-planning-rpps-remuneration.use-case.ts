import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { RetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/retirement-planning-rpps.query.repository.gateway';
import { RetirementPlanningRppsRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration/command/retirement-planning-rpps-remuneration.command.repository.gateway';
import { RetirementPlanningRppsRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration.query.repository.gateway';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { RetirementPlanningRppsRemunerationEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration.entity';
import { RetirementPlanningRppsRemunerationId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration/value-object/retirement-planning-rpps-remuneration-id.value-object';
import { RetirementPlanningRppsResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-result/retirement-planning-rpps-result.entity';
import { UpdateRetirementPlanningRppsRemunerationRequestDto } from '@module/customer/analysis-tool/dto/request/update-retirement-planning-rpps-remuneration.request.dto';
import { UpdateRetirementPlanningRppsRemunerationResponseDto } from '@module/customer/analysis-tool/dto/response/update-retirement-planning-rpps-remuneration.response.dto';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RetirementPlanningRppsNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rpps-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateRetirementPlanningRppsRemunerationUseCase {
  protected readonly _type =
    UpdateRetirementPlanningRppsRemunerationUseCase.name;

  public constructor(
    @Inject(RetirementPlanningRppsQueryRepositoryGateway)
    private readonly retirementPlanningRppsQueryRepositoryGateway: RetirementPlanningRppsQueryRepositoryGateway,
    @Inject(RetirementPlanningRppsRemunerationQueryRepositoryGateway)
    private readonly retirementPlanningRppsRemunerationQueryRepositoryGateway: RetirementPlanningRppsRemunerationQueryRepositoryGateway,
    @Inject(RetirementPlanningRppsRemunerationCommandRepositoryGateway)
    private readonly retirementPlanningRppsRemunerationCommandRepositoryGateway: RetirementPlanningRppsRemunerationCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPlanningRppsId: RetirementPlanningRppsId,
    dto: UpdateRetirementPlanningRppsRemunerationRequestDto,
  ): Promise<UpdateRetirementPlanningRppsRemunerationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const retirementPlanningRpps =
      await this.retirementPlanningRppsQueryRepositoryGateway.findOneByRetirementPlanningIdAndOrganizationIdWithRelationsOrFail(
        retirementPlanningRppsId,
        organizationSessionData.organizationId,
        RetirementPlanningRppsNotFoundError,
      );

    const currentRemunerations =
      await this.retirementPlanningRppsRemunerationQueryRepositoryGateway.findByRetirementPlanningRppsId(
        retirementPlanningRppsId,
      );

    const transactionOperations: TransactionType[] = [];

    for (const currentRemuneration of currentRemunerations) {
      transactionOperations.push(
        this.retirementPlanningRppsRemunerationCommandRepositoryGateway.deleteRetirementPlanningRppsRemuneration(
          currentRemuneration.id,
        ),
      );
    }

    const retirementPlanningRppsResultEntity =
      new RetirementPlanningRppsResultEntity({
        id: retirementPlanningRpps.retirementPlanningRppsResult?.id ?? null,
        retirementPlanningRppsCompleteAnalysis:
          retirementPlanningRpps.retirementPlanningRppsResult
            ?.retirementPlanningRppsCompleteAnalysis ?? null,
        retirementPlanningRppsSimplifiedAnalysis:
          retirementPlanningRpps.retirementPlanningRppsResult
            ?.retirementPlanningRppsSimplifiedAnalysis ?? null,
      });

    const retirementPlanningRppsEntity = new RetirementPlanningRppsEntity({
      id: retirementPlanningRpps.id,
      careerStartDate: retirementPlanningRpps.careerStartDate,
      publicServiceStartDate: retirementPlanningRpps.publicServiceStartDate,
      retirementPlanningRppsResult: retirementPlanningRppsResultEntity,
    });

    for (const remunerationDto of dto.remunerations) {
      const normalizedDateToDayOne = new Date(
        remunerationDto.date.getFullYear(),
        remunerationDto.date.getMonth(),
        1,
      );

      const remunerationEntity = new RetirementPlanningRppsRemunerationEntity({
        id: new RetirementPlanningRppsRemunerationId(),
        date: normalizedDateToDayOne,
        amount: remunerationDto.amount,
        retirementPlanningRpps: retirementPlanningRppsEntity,
      });

      transactionOperations.push(
        this.retirementPlanningRppsRemunerationCommandRepositoryGateway.createRetirementPlanningRppsRemuneration(
          remunerationEntity,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return UpdateRetirementPlanningRppsRemunerationResponseDto.build({
      retirementPlanningRppsId,
    });
  }
}
