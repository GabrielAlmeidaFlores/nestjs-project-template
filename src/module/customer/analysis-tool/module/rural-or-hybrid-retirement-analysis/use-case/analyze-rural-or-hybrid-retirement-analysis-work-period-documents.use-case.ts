import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentsRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/analyze-rural-or-hybrid-retirement-analysis-work-period-documents.request.dto';
import { AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisItemResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/analyze-rural-or-hybrid-retirement-analysis-work-period-documents.response.dto';
import { InvalidRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisJsonError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/invalid-rural-or-hybrid-retirement-analysis-work-period-document-analysis-json.error';
import {
  RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisResultType,
  RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisResultItemInterface,
} from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/interface/rural-or-hybrid-retirement-analysis-work-period-document-analysis-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentsUseCase {
  protected readonly _type =
    AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    analysisToolClientId: AnalysisToolClientId,
    dto: AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentsRequestDto,
  ): Promise<
    AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisItemResponseDto[]
  > {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolClient =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const resourceType =
      PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_WORK_PERIOD_DOCUMENT_ANALYSIS;

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(resourceType);

    const creditTransactions = await Promise.all(
      dto.documents.length > 0
        ? [
            this.consumeOrganizationCreditUseCase.execute(
              organizationSessionData.organizationId,
              resourceType,
              organizationMember.id,
            ),
          ]
        : [],
    );

    if (dto.documents.length === 0) {
      return [];
    }

    const analysisResult =
      await this.analysisProcessorGateway.getRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysis(
        promptResponse.prompt,
        this.buildClientContext(analysisToolClient.name ?? '', dto),
        dto.documents.map((document) => document.file.base64.decodeToBuffer()),
      );

    console.log('[WorkPeriodDocs] RAW AI RESPONSE:', JSON.stringify(analysisResult));

    const parsedResult = this.parseAnalysisResult(analysisResult);

    if (creditTransactions.length > 0) {
      const transaction =
        await this.baseTransactionRepositoryGateway.execute(creditTransactions);

      await transaction.commit();
    }

    return parsedResult.map(
      (
        item: RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisResultItemInterface,
      ) =>
        AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisItemResponseDto.build(
          {
            documentType: item.documentType ?? '',
            ownName: typeof item.ownName === 'boolean' ? item.ownName : String(item.ownName ?? '').toLowerCase() === 'true',
            documentYear: item.documentYear != null ? String(item.documentYear) : '',
            shortDescription: item.shortDescription ?? '',
            technicalNote: item.technicalNote ?? '',
          },
        ),
    );
  }

  private buildClientContext(
    clientName: string,
    dto: AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentsRequestDto,
  ): string {
    const contextParts: string[] = [];
    if (dto.periodStartDate) contextParts.push(`Período rural: ${dto.periodStartDate} a ${dto.periodEndDate ?? 'atual'}`);
    if (dto.workerType) contextParts.push(`Tipo de trabalhador: ${dto.workerType}`);
    if (dto.propertyName) contextParts.push(`Nome da propriedade: ${dto.propertyName}`);
    if (dto.propertyCity && dto.propertyState) contextParts.push(`Localização: ${dto.propertyCity}/${dto.propertyState}`);
    const periodContextStr = contextParts.length > 0 ? `\n\nContexto do período analisado:\n${contextParts.join('\n')}` : '';
    return `Cliente: ${clientName}${periodContextStr}`;
  }

  private parseAnalysisResult(
    analysisResult: string | null,
  ): RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisResultType {
    if (analysisResult === null) {
      throw new InvalidRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisJsonError();
    }

    let cleanedJson = analysisResult.trim();

    // Strip markdown code blocks (```json ... ``` or ``` ... ```)
    if (cleanedJson.startsWith('```')) {
      cleanedJson = cleanedJson.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    }

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    let parsedResult: unknown;
    try {
      parsedResult = JSON.parse(cleanedJson);
    } catch {
      console.error('[parseAnalysisResult] JSON.parse failed. Raw AI response:', analysisResult.substring(0, 500));
      throw new InvalidRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisJsonError();
    }

    // If AI wrapped the array in an object (e.g. { documents: [...] }), unwrap it
    if (!Array.isArray(parsedResult) && typeof parsedResult === 'object' && parsedResult !== null) {
      const obj = parsedResult as Record<string, unknown>;
      const firstArrayValue = Object.values(obj).find((v) => Array.isArray(v));
      if (firstArrayValue) {
        parsedResult = firstArrayValue;
      }
    }

    if (!this.isAnalysisResult(parsedResult)) {
      console.error('[parseAnalysisResult] isAnalysisResult failed. Parsed value:', JSON.stringify(parsedResult).substring(0, 500));
      throw new InvalidRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisJsonError();
    }

    return parsedResult;
  }

  private isAnalysisResult(
    value: unknown,
  ): value is RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisResultType {
    if (!Array.isArray(value)) {
      return false;
    }

    return value.every((item: unknown) => this.isAnalysisResultItem(item));
  }

  private isAnalysisResultItem(
    value: unknown,
  ): value is RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisResultItemInterface {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const documentAnalysis = value as Record<string, unknown>;

    const ownNameValid =
      typeof documentAnalysis['ownName'] === 'boolean' ||
      typeof documentAnalysis['ownName'] === 'string' ||
      documentAnalysis['ownName'] === null ||
      documentAnalysis['ownName'] === undefined;

    const documentYearValid =
      typeof documentAnalysis['documentYear'] === 'string' ||
      typeof documentAnalysis['documentYear'] === 'number' ||
      documentAnalysis['documentYear'] === null ||
      documentAnalysis['documentYear'] === undefined;

    const shortDescriptionValid =
      typeof documentAnalysis['shortDescription'] === 'string' ||
      documentAnalysis['shortDescription'] === null ||
      documentAnalysis['shortDescription'] === undefined;

    const technicalNoteValid =
      typeof documentAnalysis['technicalNote'] === 'string' ||
      documentAnalysis['technicalNote'] === null ||
      documentAnalysis['technicalNote'] === undefined;

    return (
      typeof documentAnalysis['documentType'] === 'string' &&
      ownNameValid &&
      documentYearValid &&
      shortDescriptionValid &&
      technicalNoteValid
    );
  }
}
