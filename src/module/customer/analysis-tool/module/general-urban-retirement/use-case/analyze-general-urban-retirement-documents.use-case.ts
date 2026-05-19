import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { GeneralUrbanRetirementAnalysisBenefitTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/enum/general-urban-retirement-analysis-benefit-type.enum';
import { AnalyzeGeneralUrbanRetirementDocumentsRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/request/analyze-general-urban-retirement-documents.request.dto';
import { AnalyzeGeneralUrbanRetirementDocumentsResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/analyze-general-urban-retirement-documents.response.dto';
import { FailedToGenerateDocumentAnalysisError } from '@module/customer/analysis-tool/module/general-urban-retirement/error/failed-to-generate-document-analysis.error';
import { InvalidBenefitTypeForDocumentAnalysisError } from '@module/customer/analysis-tool/module/general-urban-retirement/error/invalid-benefit-type-for-document-analysis.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeGeneralUrbanRetirementDocumentsUseCase {
  protected readonly _type = AnalyzeGeneralUrbanRetirementDocumentsUseCase.name;

  public constructor(
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
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
    dto: AnalyzeGeneralUrbanRetirementDocumentsRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementDocumentsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const { benefitType } = dto.json;

    if (
      benefitType !==
        GeneralUrbanRetirementAnalysisBenefitTypeEnum.FEDERATIVE_ENTITY_REVIEW &&
      benefitType !==
        GeneralUrbanRetirementAnalysisBenefitTypeEnum.BENEFIT_GRANTED_REVIEW
    ) {
      throw new InvalidBenefitTypeForDocumentAnalysisError();
    }

    const paidResourceType =
      benefitType ===
      GeneralUrbanRetirementAnalysisBenefitTypeEnum.FEDERATIVE_ENTITY_REVIEW
        ? PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_ADMINISTRATIVE_REQUEST_DENIED_ANALYSIS
        : PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_BENEFIT_AWARD_LETTER_ANALYSIS;

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        paidResourceType,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        paidResourceType,
        organizationMember.id,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
    ]);

    const documentBuffers: Buffer[] = dto.documentAnalysisFiles.map(
      (file) => file.buffer,
    );

    const analysisResult =
      benefitType ===
      GeneralUrbanRetirementAnalysisBenefitTypeEnum.FEDERATIVE_ENTITY_REVIEW
        ? await this.analysisProcessorGateway.getGeneralUrbanRetirementAdministrativeRequestDeniedAnalysis(
            promptResponse.prompt,
            documentBuffers,
          )
        : await this.analysisProcessorGateway.getGeneralUrbanRetirementBenefitAwardLetterAnalysis(
            promptResponse.prompt,
            documentBuffers,
          );

    if (analysisResult === null) {
      throw new FailedToGenerateDocumentAnalysisError();
    }

    await transaction.commit();

    return AnalyzeGeneralUrbanRetirementDocumentsResponseDto.build({
      analysis: analysisResult,
    });
  }
}
