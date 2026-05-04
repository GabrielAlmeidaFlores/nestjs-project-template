import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GeneralUrbanRetirementReviewCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/command/general-urban-retirement-review.command.repository.gateway';
import { GeneralUrbanRetirementReviewQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/general-urban-retirement-review.query.repository.gateway';
import { GeneralUrbanRetirementReviewResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-result/command/general-urban-retirement-review-result.command.repository.gateway';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';
import { CreateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/create-general-urban-retirement-review-benefit-award-letter-analysis.request.dto';
import { CreateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/create-general-urban-retirement-review-benefit-award-letter-analysis.response.dto';
import { FailedToGenerateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/failed-to-generate-general-urban-retirement-review-benefit-award-letter-analysis.error';
import { GeneralUrbanRetirementReviewNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisUseCase {
  protected readonly _type =
    CreateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewQueryRepositoryGateway: GeneralUrbanRetirementReviewQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewCommandRepositoryGateway: GeneralUrbanRetirementReviewCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewResultCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewResultCommandRepositoryGateway: GeneralUrbanRetirementReviewResultCommandRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
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
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
    dto: CreateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisRequestDto,
  ): Promise<CreateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const generalUrbanRetirementReview =
      await this.generalUrbanRetirementReviewQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewIdOrFailWithRelations(
        generalUrbanRetirementReviewId,
        GeneralUrbanRetirementReviewNotFoundError,
      );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_BENEFIT_AWARD_LETTER_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_BENEFIT_AWARD_LETTER_ANALYSIS,
        organizationMember.id,
      );

    const benefitAwardLetterDocument =
      await this.fileProcessorGateway.uploadFile(
        dto.benefitAwardLetterDocument,
      );

    const benefitAwardLetterAnalysis =
      await this.analysisProcessorGateway.getGeneralUrbanRetirementBenefitAwardLetterAnalysis(
        promptResponse.prompt,
        [dto.benefitAwardLetterDocument.buffer],
      );

    if (benefitAwardLetterAnalysis === null) {
      throw new FailedToGenerateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisError();
    }

    const resultEntity = new GeneralUrbanRetirementReviewResultEntity({
      ...(generalUrbanRetirementReview.generalUrbanRetirementReviewResult !==
        null && {
        id: generalUrbanRetirementReview.generalUrbanRetirementReviewResult.id,
      }),
      ...generalUrbanRetirementReview.generalUrbanRetirementReviewResult,
      benefitAwardLetterAnalysis,
      benefitAwardLetterAnalysisRaw: benefitAwardLetterAnalysis,
    });

    const reviewEntity = new GeneralUrbanRetirementReviewEntity({
      ...generalUrbanRetirementReview,
      benefitAwardLetterDocument,
      generalUrbanRetirementReviewResult: resultEntity,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      this.generalUrbanRetirementReviewResultCommandRepositoryGateway.updateGeneralUrbanRetirementReviewResult(
        resultEntity.id,
        resultEntity,
      ),
      this.generalUrbanRetirementReviewCommandRepositoryGateway.updateGeneralUrbanRetirementReview(
        generalUrbanRetirementReviewId,
        reviewEntity,
      ),
    ]);

    await transaction.commit();

    return CreateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisResponseDto.build(
      {
        benefitAwardLetterAnalysis,
      },
    );
  }
}
