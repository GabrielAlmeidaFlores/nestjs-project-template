import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralTimelineAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/command/rural-timeline-analysis.command.repository.gateway';
import { RuralTimelineAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/rural-timeline-analysis.query.repository.gateway';
import { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { GenerateRuralTimelineConsolidatedDocumentAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/generate-rural-timeline-consolidated-document-analysis.response.dto';
import { ConsolidatedDocumentAnalysisGenerationFailedError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/consolidated-document-analysis-generation-failed.error';
import { NoDocumentsFoundForConsolidatedAnalysisError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/no-documents-found-for-consolidated-analysis.error';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GenerateRuralTimelineConsolidatedDocumentAnalysisUseCase {
  protected readonly _type =
    GenerateRuralTimelineConsolidatedDocumentAnalysisUseCase.name;

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
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
  ): Promise<GenerateRuralTimelineConsolidatedDocumentAnalysisResponseDto> {
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

    const clientName = analysisToolRecordQueryResult.analysisToolClient.name;

    const ruralTimelineAnalysis =
      await this.ruralTimelineAnalysisQueryRepositoryGateway.findWithRelationsByRuralTimelineAnalysisIdOrFail(
        ruralTimelineAnalysisId,
      );

    const allDocumentBuffers: Buffer[] = [];
    const periodsWithDocuments: Array<{
      periodId: string;
      startDate: Date | null;
      endDate: Date | null;
      workerType: string | null;
      workRegimeType: string | null;
      documentAnalysis: string | null;
      documents: Array<{ type: string; year: number | null }>;
    }> = [];

    for (const period of ruralTimelineAnalysis.ruralTimelineAnalysisPeriod) {
      const analyzedDocuments =
        period.ruralTimelineAnalysisPeriodDocument.filter(
          (doc) =>
            doc.documentYear !== null ||
            doc.documentHolderType !== null ||
            doc.selfOwned !== null ||
            doc.probatoryPurpose !== null,
        );

      if (analyzedDocuments.length > 0) {
        const periodDocuments = [];

        for (const doc of analyzedDocuments) {
          const buffer = await this.fileProcessorGateway.getFileBuffer(
            doc.document,
          );
          allDocumentBuffers.push(buffer);

          periodDocuments.push({
            type: doc.type,
            year: doc.documentYear ?? null,
          });
        }

        periodsWithDocuments.push({
          periodId: period.id.toString(),
          startDate: period.startDate,
          endDate: period.endDate,
          workerType: period.workerType,
          workRegimeType: period.workRegimeType,
          documentAnalysis: period.documentAnalysis,
          documents: periodDocuments,
        });
      }
    }

    if (allDocumentBuffers.length === 0) {
      throw new NoDocumentsFoundForConsolidatedAnalysisError();
    }

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_ANALYSIS_CONSOLIDATED_DOCUMENT_ANALYSIS,
      );

    const creditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_ANALYSIS_CONSOLIDATED_DOCUMENT_ANALYSIS,
        organizationMember.id,
      );

    const consolidatedContext = JSON.stringify(
      {
        clientName,
        workRegime: ruralTimelineAnalysis.workRegime,
        totalPeriods: ruralTimelineAnalysis.ruralTimelineAnalysisPeriod.length,
        periodsWithDocuments,
        totalDocuments: allDocumentBuffers.length,
      },
      null,
      2,
    );

    const systemInstruction = promptResponse.prompt;

    const analysisResult =
      await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          systemInstruction,
          prompt: consolidatedContext,
          promptFiles: allDocumentBuffers,
        }),
      );

    if (analysisResult === null) {
      throw new ConsolidatedDocumentAnalysisGenerationFailedError();
    }

    const updatedEntity = new RuralTimelineAnalysisEntity({
      id: ruralTimelineAnalysisId,
      ruralTimelineCompleteAnalysis:
        ruralTimelineAnalysis.ruralTimelineCompleteAnalysis,
      ruralTimelineSimplifiedAnalysis:
        ruralTimelineAnalysis.ruralTimelineSimplifiedAnalysis,
      ruralTimelinePeriodDocumentAnalysis: analysisResult,
      analysisToolClientId: analysisToolRecordQueryResult.analysisToolClient.id,
      workRegime: ruralTimelineAnalysis.workRegime,
      createdAt: ruralTimelineAnalysis.createdAt,
      updatedAt: new Date(),
      deletedAt: null,
    });

    await this.baseTransactionRepositoryGateway.execute([
      this.ruralTimelineAnalysisCommandRepositoryGateway.updateRuralTimeline(
        updatedEntity,
      ),
      creditTransaction,
    ]);

    return GenerateRuralTimelineConsolidatedDocumentAnalysisResponseDto.build({
      ruralTimelinePeriodDocumentAnalysis: analysisResult,
    });
  }
}
