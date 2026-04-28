import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { AnalyzeRuralOrHybridRetirementRejectionWorkPeriodDocumentsRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/analyze-rural-or-hybrid-retirement-rejection-work-period-documents.request.dto';
import { AnalyzeRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisItemResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/analyze-rural-or-hybrid-retirement-rejection-work-period-documents.response.dto';
import { InvalidRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisJsonError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/invalid-rural-or-hybrid-retirement-rejection-work-period-document-analysis-json.error';
import {
  RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisResultType,
  RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisResultItemInterface,
} from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/model/interface/rural-or-hybrid-retirement-rejection-work-period-document-analysis-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeRuralOrHybridRetirementRejectionWorkPeriodDocumentsUseCase {
  protected readonly _type =
    AnalyzeRuralOrHybridRetirementRejectionWorkPeriodDocumentsUseCase.name;

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
    dto: AnalyzeRuralOrHybridRetirementRejectionWorkPeriodDocumentsRequestDto,
  ): Promise<
    AnalyzeRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisItemResponseDto[]
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
      PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_REJECTION_WORK_PERIOD_DOCUMENT_ANALYSIS;

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
      await this.analysisProcessorGateway.getRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis(
        promptResponse.prompt,
        this.buildClientContext(analysisToolClient.name ?? '', dto),
        dto.documents.map((document) => document.file.base64.decodeToBuffer()),
      );

    const parsedResult = this.parseAnalysisResult(analysisResult);

    if (creditTransactions.length > 0) {
      const transaction =
        await this.baseTransactionRepositoryGateway.execute(creditTransactions);

      await transaction.commit();
    }

    return parsedResult.map(
      (
        item: RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisResultItemInterface,
      ) =>
        AnalyzeRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisItemResponseDto.build(
          {
            documentType: item.documentType,
            ownName: item.ownName,
            documentYear: item.documentYear,
            shortDescription: item.shortDescription,
            technicalNote: item.technicalNote,
          },
        ),
    );
  }

  private buildClientContext(
    clientName: string,
    dto: AnalyzeRuralOrHybridRetirementRejectionWorkPeriodDocumentsRequestDto,
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
  ): RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisResultType {
    if (analysisResult === null) {
      throw new InvalidRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisJsonError();
    }

    let cleanedJson = analysisResult;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsedResult: unknown = JSON.parse(cleanedJson);

    if (!this.isAnalysisResult(parsedResult)) {
      throw new InvalidRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisJsonError();
    }

    return parsedResult;
  }

  private isAnalysisResult(
    value: unknown,
  ): value is RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisResultType {
    if (!Array.isArray(value)) {
      return false;
    }

    return value.every((item: unknown) => this.isAnalysisResultItem(item));
  }

  private isAnalysisResultItem(
    value: unknown,
  ): value is RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisResultItemInterface {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const documentAnalysis = value as Record<string, unknown>;

    return (
      typeof documentAnalysis['documentType'] === 'string' &&
      typeof documentAnalysis['ownName'] === 'boolean' &&
      typeof documentAnalysis['documentYear'] === 'string' &&
      typeof documentAnalysis['shortDescription'] === 'string' &&
      typeof documentAnalysis['technicalNote'] === 'string'
    );
  }
}
