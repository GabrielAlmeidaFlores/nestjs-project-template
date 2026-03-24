import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { CnisProcessorGateway } from '@lib/cnis-processor/cnis-processor.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralTimelineAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/command/rural-timeline-analysis.command.repository.gateway';
import { RuralTimelineAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/rural-timeline-analysis.query.repository.gateway';
import { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { GenerateRuralTimelineAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/generate-rural-timeline-analysis.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GenerateRuralTimelineAnalysisUseCase {
  protected readonly _type = GenerateRuralTimelineAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisQueryRepositoryGateway: RuralTimelineAnalysisQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisCommandRepositoryGateway: RuralTimelineAnalysisCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(CnisProcessorGateway)
    private readonly cnisProcessorGateway: CnisProcessorGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalyzerGateway: CnisAnalyzerGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
  ): Promise<GenerateRuralTimelineAnalysisResponseDto> {
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
        RuralTimelineAnalysisNotFoundError,
      );

    const ruralTimelineAnalysis =
      await this.ruralTimelineAnalysisQueryRepositoryGateway.findWithRelationsByRuralTimelineAnalysisIdOrFail(
        ruralTimelineAnalysisId,
      );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_COMPLETE_ANALYSIS,
      );

    const creditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const documentBuffers: Buffer[] = [];

    const cnisAnalysisResults = [];
    const affiliationDates: Date[] = [];
    for (const doc of ruralTimelineAnalysis.ruralTimelineDocument) {
      const buffer = await this.fileProcessorGateway.getFileBuffer(
        doc.document,
      );
      documentBuffers.push(buffer);

      const cnisData =
        await this.cnisProcessorGateway.parseCnisDocument(buffer);

      for (const relation of cnisData.socialSecurityRelations ?? []) {
        if (relation.socialSecurityAffiliationInfo.dataFim !== undefined) {
          affiliationDates.push(relation.socialSecurityAffiliationInfo.dataFim);
        }
      }

      const analysisToolClient = new AnalysisToolClientEntity({
        ...analysisToolRecordQueryResult.analysisToolClient,
        createdBy: analysisToolRecordQueryResult.createdBy.id,
        updatedBy: analysisToolRecordQueryResult.updatedBy.id,
      });

      const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
        cnisData,
        analysisToolClient,
      );
      cnisAnalysisResults.push({
        documentType: doc.type,
        documentName: doc.document,
        analysis: cnisAnalysis,
      });
    }

    const analysisContext = JSON.stringify(
      {
        analysisToolClient: analysisToolRecordQueryResult.analysisToolClient,
        ruralTimelineAnalysis: ruralTimelineAnalysis,
        cnisAnalysisResults: cnisAnalysisResults,
      },
      null,
      2,
    );

    const systemInstruction = promptResponse.prompt;

    for (const period of ruralTimelineAnalysis.ruralTimelineAnalysisPeriod) {
      for (const doc of period.ruralTimelineAnalysisPeriodDocument) {
        const buffer = await this.fileProcessorGateway.getFileBuffer(
          doc.document,
        );
        documentBuffers.push(buffer);
      }
    }

    const analysisResult =
      await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          systemInstruction,
          prompt: analysisContext,
          promptFiles: documentBuffers,
        }),
      );

    if (analysisResult === null) {
      throw new Error('Failed to generate rural timeline analysis');
    }

    const updatedEntity = new RuralTimelineAnalysisEntity({
      id: ruralTimelineAnalysisId,
      ruralTimelineCompleteAnalysis: analysisResult,
      ruralTimelineSimplifiedAnalysis:
        ruralTimelineAnalysis.ruralTimelineSimplifiedAnalysis,
      ruralTimelinePeriodDocumentAnalysis:
        ruralTimelineAnalysis.ruralTimelinePeriodDocumentAnalysis,
      analysisToolClientId: analysisToolRecordQueryResult.analysisToolClient.id,
      workRegime: ruralTimelineAnalysis.workRegime,
      createdAt: ruralTimelineAnalysis.createdAt,
      updatedAt: new Date(),
      deletedAt: null,
    });

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.RESULT_ADDED,
        analysisType: AnalysisToolRecordTypeEnum.RURAL_TIMELINE_ANALYSIS,
        organizationMemberId: organizationMember.id.toString(),
        analysisToolClientId:
          analysisToolRecordQueryResult.analysisToolClient.id.toString(),
        analysisToolRecordId: analysisToolRecordQueryResult.id.toString(),
        transactions: [
          this.ruralTimelineAnalysisCommandRepositoryGateway.updateRuralTimeline(
            updatedEntity,
          ),
          creditTransaction,
        ],
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();

    const lastAffiliationDate =
      affiliationDates.length > 0
        ? affiliationDates.reduce((max, d) => (d > max ? d : max))
        : undefined;

    return GenerateRuralTimelineAnalysisResponseDto.build({
      ruralTimelineCompleteAnalysis: analysisResult,
      ...(lastAffiliationDate !== undefined && { lastAffiliationDate }),
    });
  }
}
