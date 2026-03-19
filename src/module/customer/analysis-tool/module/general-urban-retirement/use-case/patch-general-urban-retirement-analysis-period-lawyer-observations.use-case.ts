import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { GeneralUrbanRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/query/general-urban-retirement-analysis.query.repository.gateway';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-period-disability/command/general-urban-retirement-analysis-period-disability.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-period-special-time/command/general-urban-retirement-analysis-period-special-time.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import { PatchGeneralUrbanRetirementAnalysisPeriodLawyerObservationsRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/request/patch-general-urban-retirement-analysis-period-lawyer-observations.request.dto';
import { UpdateGeneralUrbanRetirementAnalysisPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/update-general-urban-retirement-analysis-period.response.dto';
import { GeneralUrbanRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement/error/general-urban-retirement-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class PatchGeneralUrbanRetirementAnalysisPeriodLawyerObservationsUseCase {
  protected readonly _type =
    PatchGeneralUrbanRetirementAnalysisPeriodLawyerObservationsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementAnalysisQueryRepositoryGateway)
    private readonly generalUrbanRetirementAnalysisQueryRepositoryGateway: GeneralUrbanRetirementAnalysisQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(
      GeneralUrbanRetirementAnalysisPeriodSpecialTimeCommandRepositoryGateway,
    )
    private readonly specialTimeCommandRepositoryGateway: GeneralUrbanRetirementAnalysisPeriodSpecialTimeCommandRepositoryGateway,
    @Inject(
      GeneralUrbanRetirementAnalysisPeriodDisabilityCommandRepositoryGateway,
    )
    private readonly disabilityCommandRepositoryGateway: GeneralUrbanRetirementAnalysisPeriodDisabilityCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
    dto: PatchGeneralUrbanRetirementAnalysisPeriodLawyerObservationsRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementAnalysisPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByGeneralUrbanRetirementAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      generalUrbanRetirementAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      GeneralUrbanRetirementAnalysisNotFoundError,
    );

    const analysis =
      await this.generalUrbanRetirementAnalysisQueryRepositoryGateway.findOneByGeneralUrbanRetirementAnalysisIdAndOrganizationIdWithRelationsOrFail(
        generalUrbanRetirementAnalysisId,
        organizationSessionData.organizationId,
        GeneralUrbanRetirementAnalysisNotFoundError,
      );

    const transactionOperations: TransactionType[] = [];

    for (const periodItem of dto.periods) {
      const matchingPeriod = analysis.periods.find(
        (p) => p.id.toString() === periodItem.periodId,
      );

      if (matchingPeriod === undefined) continue;

      if (
        matchingPeriod.specialTimePeriod !== undefined &&
        periodItem.specialTimeObservations !== undefined
      ) {
        transactionOperations.push(
          this.specialTimeCommandRepositoryGateway.updateLawyerObservations(
            matchingPeriod.specialTimePeriod.id,
            periodItem.specialTimeObservations ?? null,
          ),
        );
      }

      if (
        matchingPeriod.disabilityPeriod !== undefined &&
        periodItem.disabilityObservations !== undefined
      ) {
        transactionOperations.push(
          this.disabilityCommandRepositoryGateway.updateLawyerObservations(
            matchingPeriod.disabilityPeriod.id,
            periodItem.disabilityObservations ?? null,
          ),
        );
      }
    }

    if (transactionOperations.length > 0) {
      const transaction = await this.baseTransactionRepositoryGateway.execute(
        transactionOperations,
      );
      await transaction.commit();
    }

    return UpdateGeneralUrbanRetirementAnalysisPeriodResponseDto.build({
      generalUrbanRetirementAnalysisId,
    });
  }
}
