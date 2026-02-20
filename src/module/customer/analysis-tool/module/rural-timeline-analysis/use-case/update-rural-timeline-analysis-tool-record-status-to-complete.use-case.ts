import { Injectable, Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-record-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { UpdateRuralTimelineAnalysisToolRecordToCompleteStatusResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/update-rural-timeline-analysis-tool-record-to-complete-status.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateRuralTimelineAnalysisToolRecordStatusToCompleteUseCase {
  protected readonly _type =
    UpdateRuralTimelineAnalysisToolRecordStatusToCompleteUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
  ): Promise<UpdateRuralTimelineAnalysisToolRecordToCompleteStatusResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralTimelineAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        ruralTimelineAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AnalysisToolRecordNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecordQueryResult.analysisToolClient,
      createdBy: analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
    });

    const ruralTimelineAnalysisEntity =
      analysisToolRecordQueryResult.ruralTimelineAnalysis
        ? new RuralTimelineAnalysisEntity({
            id: analysisToolRecordQueryResult.ruralTimelineAnalysis.id,
            analysisToolClientId:
              analysisToolRecordQueryResult.analysisToolClient.id,
            workRegime:
              analysisToolRecordQueryResult.ruralTimelineAnalysis.workRegime,
            ruralTimelineCompleteAnalysis:
              analysisToolRecordQueryResult.ruralTimelineAnalysis
                .ruralTimelineCompleteAnalysis,
            ruralTimelineSimplifiedAnalysis:
              analysisToolRecordQueryResult.ruralTimelineAnalysis
                .ruralTimelineSimplifiedAnalysis,
            ruralTimelinePeriodDocumentAnalysis:
              analysisToolRecordQueryResult.ruralTimelineAnalysis
                .ruralTimelinePeriodDocumentAnalysis,
            createdAt:
              analysisToolRecordQueryResult.ruralTimelineAnalysis.createdAt,
            updatedAt:
              analysisToolRecordQueryResult.ruralTimelineAnalysis.updatedAt,
            deletedAt:
              analysisToolRecordQueryResult.ruralTimelineAnalysis.deletedAt,
          })
        : null;

    const analysisToolRecordUpdate = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      status: AnalysisStatusEnum.COMPLETED,
      analysisToolClient,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      cnisFastAnalysis: null,
      retirementPlanningRgps: null,
      retirementPlanningRpps: null,
      specialActivity: null,
      judicialCaseAnalysis: null,
      administrativeProcedureInssAnalysis: null,
      medicalQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      speechGenerator: null,
      disabilityAssessmentForBpcAnalysis: null,
      audienceQuestionGenerator: null,
      perCapitaIncomeForBpcAnalysis: null,
      ruralTimelineAnalysis: ruralTimelineAnalysisEntity,
      insuranceQualityAnalysis: null,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecordQueryResult.id,
        analysisToolRecordUpdate,
      ),
    );

    await transaction.commit();

    return UpdateRuralTimelineAnalysisToolRecordToCompleteStatusResponseDto.build(
      {
        ruralTimelineAnalysisId,
      },
    );
  }
}
