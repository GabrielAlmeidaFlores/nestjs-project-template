import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralTimelineAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/rural-timeline-analysis.query.repository.gateway';
import { RuralTimelineAnalysisPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period/command/rural-timeline-analysis-period.command.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/rural-timeline-analysis-period.entity';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import { GenerateRuralTimelineAnalysisPeriodDocumentAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/generate-rural-timeline-analysis-period-document-analysis.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GenerateRuralTimelineAnalysisPeriodDocumentAnalysisUseCase {
  protected readonly _type =
    GenerateRuralTimelineAnalysisPeriodDocumentAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisQueryRepositoryGateway: RuralTimelineAnalysisQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodCommandRepositoryGateway: RuralTimelineAnalysisPeriodCommandRepositoryGateway,
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
    ruralTimelineAnalysisPeriodId: RuralTimelineAnalysisPeriodId,
  ): Promise<GenerateRuralTimelineAnalysisPeriodDocumentAnalysisResponseDto> {
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

    const period = ruralTimelineAnalysis.ruralTimelineAnalysisPeriod.find(
      (p) => p.id.toString() === ruralTimelineAnalysisPeriodId.toString(),
    );

    if (!period) {
      throw new RuralTimelineAnalysisNotFoundError();
    }

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS,
      );

    const creditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS,
        organizationMember.id,
      );

    const periodContext = JSON.stringify(
      {
        clientName,
        period,
      },
      null,
      2,
    );

    const systemInstruction = promptResponse.prompt;

    const analyzedDocuments = period.ruralTimelineAnalysisPeriodDocument.filter(
      (doc) =>
        doc.documentYear !== null ||
        doc.documentHolderType !== null ||
        doc.selfOwned !== null ||
        doc.probatoryPurpose !== null,
    );

    const documentBuffers = await Promise.all(
      analyzedDocuments.map(async (doc) => {
        const buffer = await this.fileProcessorGateway.getFileBuffer(
          doc.document,
        );
        return buffer;
      }),
    );

    const analysisResult =
      await this.generativeIaGateway.generateFlashResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          systemInstruction,
          prompt: periodContext,
          promptFiles: documentBuffers,
        }),
      );

    const updatedPeriod = new RuralTimelineAnalysisPeriodEntity({
      id: ruralTimelineAnalysisPeriodId,
      startDate: period.startDate,
      endDate: period.endDate,
      workerType: period.workerType,
      workRegimeType: period.workRegimeType,
      productionDestination: period.productionDestination,
      documentAnalysis: analysisResult,
      ruralTimelineId: ruralTimelineAnalysisId,
      ruralTimelinePeriodPropertyId:
        period.ruralTimelineAnalysisPeriodProperty !== null
          ? period.ruralTimelineAnalysisPeriodProperty.id
          : null,
      ruralTimelinePeriodResidenceId:
        period.ruralTimelineAnalysisPeriodResidence !== null
          ? period.ruralTimelineAnalysisPeriodResidence.id
          : null,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      creditTransaction,
      this.ruralTimelineAnalysisPeriodCommandRepositoryGateway.createRuralTimelineAnalysisPeriod(
        updatedPeriod,
      ),
    ]);

    await transaction.commit();

    return GenerateRuralTimelineAnalysisPeriodDocumentAnalysisResponseDto.build(
      {
        documentAnalysis: analysisResult,
      },
    );
  }
}
