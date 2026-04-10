import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history/query/survivor-pension-analysis-deceased-work-history.query.repository.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-period/query/survivor-pension-analysis-deceased-work-history-period.query.repository.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-deceased-work-history-period-document.response.dto';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-deceased-work-history-period.response.dto';
import { ListSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/list-survivor-pension-analysis-deceased-work-history-periods.response.dto';
import { SurvivorPensionAnalysisDwhNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-deceased-work-history-not-found.error';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsUseCase {
  protected readonly _type =
    ListSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway)
    private readonly survivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway: SurvivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryRepositoryGateway,
    )
    private readonly survivorPensionAnalysisDeceasedWorkHistoryPeriodQueryRepositoryGateway: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisDwhId: SurvivorPensionAnalysisDeceasedWorkHistoryId,
  ): Promise<ListSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const dwhResult =
      await this.survivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway.findOneByIdOrFail(
        survivorPensionAnalysisDwhId,
        SurvivorPensionAnalysisDwhNotFoundError,
      );

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      dwhResult.survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    const periodResults =
      await this.survivorPensionAnalysisDeceasedWorkHistoryPeriodQueryRepositoryGateway.findManyBySurvivorPensionAnalysisDeceasedWorkHistoryId(
        survivorPensionAnalysisDwhId,
      );

    const periods = periodResults.map((period) =>
      GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto.build({
        survivorPensionAnalysisDwhpId: period.id,
        survivorPensionAnalysisDeceasedWorkHistoryId:
          period.survivorPensionAnalysisDeceasedWorkHistoryId,
        ...(period.startDate !== null && { startDate: period.startDate }),
        ...(period.endDate !== null && { endDate: period.endDate }),
        ...(period.specialPeriodStartDate !== null && {
          specialPeriodStartDate: period.specialPeriodStartDate,
        }),
        ...(period.specialPeriodEndDate !== null && {
          specialPeriodEndDate: period.specialPeriodEndDate,
        }),
        ...(period.specialTimeType !== null && {
          specialTimeType: period.specialTimeType,
        }),
        ...(period.jobTitle !== null && { jobTitle: period.jobTitle }),
        ...(period.careerName !== null && { careerName: period.careerName }),
        ...(period.serviceType !== null && { serviceType: period.serviceType }),
        ...(period.department !== null && { department: period.department }),
        documents: period.documents.map((doc) =>
          GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentResponseDto.build(
            {
              documentType: doc.documentType,
              documentName: doc.documentName,
              createdAt: doc.createdAt,
              updatedAt: doc.updatedAt,
            },
          ),
        ),
        createdAt: period.createdAt,
        updatedAt: period.updatedAt,
      }),
    );

    return ListSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsResponseDto.build(
      { periods },
    );
  }
}
