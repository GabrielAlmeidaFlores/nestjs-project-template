import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history/query/survivor-pension-analysis-deceased-work-history.query.repository.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-period/query/survivor-pension-analysis-deceased-work-history-period.query.repository.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/value-object/survivor-pension-analysis-deceased-work-history-period-id/survivor-pension-analysis-deceased-work-history-period-id.value-object';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-deceased-work-history-period-document.response.dto';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-deceased-work-history-period.response.dto';
import { SurvivorPensionAnalysisDwhNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-deceased-work-history-not-found.error';
import { SurvivorPensionAnalysisDwhpNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-deceased-work-history-period-not-found.error';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase {
  protected readonly _type =
    GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase.name;

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
    survivorPensionAnalysisDwhpId: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
  ): Promise<GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const dwhpResult =
      await this.survivorPensionAnalysisDeceasedWorkHistoryPeriodQueryRepositoryGateway.findOneByIdOrFail(
        survivorPensionAnalysisDwhpId,
        SurvivorPensionAnalysisDwhpNotFoundError,
      );

    const dwhResult =
      await this.survivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway.findOneByIdOrFail(
        dwhpResult.survivorPensionAnalysisDeceasedWorkHistoryId,
        SurvivorPensionAnalysisDwhNotFoundError,
      );

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      dwhResult.survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    return GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto.build(
      {
        survivorPensionAnalysisDwhpId: dwhpResult.id,
        survivorPensionAnalysisDeceasedWorkHistoryId:
          dwhpResult.survivorPensionAnalysisDeceasedWorkHistoryId,
        ...(dwhpResult.startDate !== null && {
          startDate: dwhpResult.startDate,
        }),
        ...(dwhpResult.endDate !== null && { endDate: dwhpResult.endDate }),
        ...(dwhpResult.specialPeriodStartDate !== null && {
          specialPeriodStartDate: dwhpResult.specialPeriodStartDate,
        }),
        ...(dwhpResult.specialPeriodEndDate !== null && {
          specialPeriodEndDate: dwhpResult.specialPeriodEndDate,
        }),
        ...(dwhpResult.specialTimeType !== null && {
          specialTimeType: dwhpResult.specialTimeType,
        }),
        ...(dwhpResult.jobTitle !== null && { jobTitle: dwhpResult.jobTitle }),
        ...(dwhpResult.careerName !== null && {
          careerName: dwhpResult.careerName,
        }),
        ...(dwhpResult.serviceType !== null && {
          serviceType: dwhpResult.serviceType,
        }),
        ...(dwhpResult.department !== null && {
          department: dwhpResult.department,
        }),
        documents: dwhpResult.documents.map((doc) =>
          GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentResponseDto.build(
            {
              documentType: doc.documentType,
              documentName: doc.documentName,
              createdAt: doc.createdAt,
              updatedAt: doc.updatedAt,
            },
          ),
        ),
        createdAt: dwhpResult.createdAt,
        updatedAt: dwhpResult.updatedAt,
      },
    );
  }
}
