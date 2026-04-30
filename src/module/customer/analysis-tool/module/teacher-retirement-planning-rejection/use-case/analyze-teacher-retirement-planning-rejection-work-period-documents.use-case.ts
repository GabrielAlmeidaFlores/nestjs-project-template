import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentsRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/request/analyze-teacher-retirement-planning-rejection-work-period-documents.request.dto';
import { AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisItemResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/analyze-teacher-retirement-planning-rejection-work-period-documents.response.dto';
import { InvalidTeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisJsonError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/error/invalid-teacher-retirement-planning-rejection-work-period-document-analysis-json.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type {
  TeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisResultItemInterface,
  TeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisResultType,
} from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/interface/teacher-retirement-planning-rejection-work-period-document-analysis-result.interface';

@Injectable()
export class AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentsUseCase {
  protected readonly _type =
    AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentsUseCase.name;

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
    dto: AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentsRequestDto,
  ): Promise<
    AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisItemResponseDto[]
  > {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
      analysisToolClientId,
      organizationSessionData.organizationId,
      AnalysisToolClientNotFoundError,
    );

    const resourceType =
      PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_REJECTION_WORK_PERIOD_DOCUMENT_ANALYSIS;

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(resourceType);

    if (dto.documents.length === 0) {
      return [];
    }

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        resourceType,
        organizationMember.id,
      );

    const analysisResult =
      await this.analysisProcessorGateway.getTeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysis(
        promptResponse.prompt,
        this.buildClientContext(dto),
        dto.documents.map((document) => document.file.base64.decodeToBuffer()),
      );

    const parsedResult = this.parseAnalysisResult(analysisResult);

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(
        consumeCreditTransaction,
      );

    await transaction.commit();

    return parsedResult.map(
      (
        item: TeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisResultItemInterface,
      ) =>
        AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisItemResponseDto.build(
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
    dto: AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentsRequestDto,
  ): string {
    const contextParts: string[] = [];

    if (dto.periodStartDate !== undefined || dto.periodEndDate !== undefined) {
      contextParts.push(
        `Período: ${dto.periodStartDate ?? ''} a ${dto.periodEndDate ?? 'atual'}`,
      );
    }

    if (dto.workerType !== undefined) {
      contextParts.push(`Tipo de trabalhador: ${dto.workerType}`);
    }

    if (dto.institutionName !== undefined) {
      contextParts.push(`Instituição: ${dto.institutionName}`);
    }

    if (dto.educationLevel !== undefined) {
      contextParts.push(`Nível de ensino: ${dto.educationLevel}`);
    }

    if (dto.functionPerformed !== undefined) {
      contextParts.push(`Função exercida: ${dto.functionPerformed}`);
    }

    return contextParts.length > 0
      ? `Contexto do período analisado:\n${contextParts.join('\n')}`
      : '';
  }

  private parseAnalysisResult(
    analysisResult: string | null,
  ): TeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisResultType {
    if (analysisResult === null) {
      throw new InvalidTeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisJsonError();
    }

    let cleanedJson = analysisResult;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsedResult: unknown = JSON.parse(cleanedJson);

    if (!this.isAnalysisResult(parsedResult)) {
      throw new InvalidTeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisJsonError();
    }

    return parsedResult;
  }

  private isAnalysisResult(
    value: unknown,
  ): value is TeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisResultType {
    if (!Array.isArray(value)) {
      return false;
    }

    return value.every((item: unknown) => this.isAnalysisResultItem(item));
  }

  private isAnalysisResultItem(
    value: unknown,
  ): value is TeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisResultItemInterface {
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
