import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-document-is-not-valid.error';
import { GeneralUrbanRetirementReviewQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/general-urban-retirement-review.query.repository.gateway';
import { GeneralUrbanRetirementReviewAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-analysis-result/query/general-urban-retirement-review-analysis-result.query.repository.gateway';
import { GetGeneralUrbanRetirementReviewAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-analysis-result/query/result/get-general-urban-retirement-review-analysis-result.query.result';
import { GeneralUrbanRetirementReviewResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-result/command/general-urban-retirement-review-result.command.repository.gateway';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';
import { CreateGeneralUrbanRetirementReviewFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/create-general-urban-retirement-review-first-analysis.response.dto';
import { FailedToGenerateGeneralUrbanRetirementReviewFirstAnalysisError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/failed-to-generate-general-urban-retirement-review-first-analysis.error';
import { GeneralUrbanRetirementReviewBenefitAwardLetterAnalysisNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-benefit-award-letter-analysis-not-found.error';
import { GeneralUrbanRetirementReviewCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-cnis-document-not-found.error';
import { GeneralUrbanRetirementReviewNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-not-found.error';
import { InvalidGeneralUrbanRetirementReviewFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/invalid-general-urban-retirement-review-first-analysis-json.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateGeneralUrbanRetirementReviewFirstAnalysisUseCase {
  protected readonly _type =
    CreateGeneralUrbanRetirementReviewFirstAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewQueryRepositoryGateway: GeneralUrbanRetirementReviewQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewAnalysisResultQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewAnalysisResultQueryRepositoryGateway: GeneralUrbanRetirementReviewAnalysisResultQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewResultCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewResultCommandRepositoryGateway: GeneralUrbanRetirementReviewResultCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalyzerGateway: CnisAnalyzerGateway,
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
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
  ): Promise<CreateGeneralUrbanRetirementReviewFirstAnalysisResponseDto> {
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

    if (generalUrbanRetirementReview.cnisDocument === null) {
      throw new GeneralUrbanRetirementReviewCnisDocumentNotFoundError();
    }

    const currentResult =
      generalUrbanRetirementReview.generalUrbanRetirementReviewResult;

    if (currentResult?.benefitAwardLetterAnalysis === null) {
      throw new GeneralUrbanRetirementReviewBenefitAwardLetterAnalysisNotFoundError();
    }

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      generalUrbanRetirementReview.cnisDocument,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisRecord =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByGeneralUrbanRetirementReviewIdAndOrganizationIdAndAuthIdentityIdOrFail(
        generalUrbanRetirementReviewId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        GeneralUrbanRetirementReviewNotFoundError,
      );

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      new AnalysisToolClientEntity({
        ...analysisRecord.analysisToolClient,
        createdBy: analysisRecord.analysisToolClient.createdBy.id,
        updatedBy: analysisRecord.analysisToolClient.updatedBy.id,
      }),
    );

    const analysisResultQueryRepository = this
      .generalUrbanRetirementReviewAnalysisResultQueryRepositoryGateway as {
      findManyByGeneralUrbanRetirementReviewId: (
        generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
      ) => Promise<GetGeneralUrbanRetirementReviewAnalysisResultQueryResult[]>;
    };

    const analysisResults =
      await analysisResultQueryRepository.findManyByGeneralUrbanRetirementReviewId(
        generalUrbanRetirementReviewId,
      );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const firstAnalysisRaw =
      await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          systemInstruction: promptResponse.prompt,
          promptFiles: [],
          prompt: [
            `CLIENT_DATA:\n${JSON.stringify(analysisRecord.analysisToolClient)}`,
            `BENEFIT_AWARD_LETTER_ANALYSIS:\n${currentResult?.benefitAwardLetterAnalysis}`,
            `CNIS_ANALYZER_RESPONSE:\n${JSON.stringify(cnisAnalysis, null, 2)}`,
            `PERIODS:\n${JSON.stringify(
              generalUrbanRetirementReview.generalUrbanRetirementReviewPeriod,
              null,
              2,
            )}`,
            `INSS_BENEFITS:\n${JSON.stringify(
              generalUrbanRetirementReview.generalUrbanRetirementReviewBenefit,
              null,
              2,
            )}`,
            `LEGAL_PROCEEDINGS:\n${JSON.stringify(
              generalUrbanRetirementReview.generalUrbanRetirementReviewLegalProceeding,
              null,
              2,
            )}`,
            `TIME_ACCELERATOR_ANALYSIS_RESULTS:\n${JSON.stringify(
              analysisResults,
              null,
              2,
            )}`,
          ].join('\n\n'),
          responseConfig: ResponseConfigInputModel.build({
            responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
          }),
        }),
      );

    if (firstAnalysisRaw === null) {
      throw new FailedToGenerateGeneralUrbanRetirementReviewFirstAnalysisError();
    }

    const cleanedFirstAnalysis =
      this.parseFirstAnalysisOrThrow(firstAnalysisRaw);

    const resultEntity = new GeneralUrbanRetirementReviewResultEntity({
      ...currentResult,
      firstAnalysis: cleanedFirstAnalysis,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      this.generalUrbanRetirementReviewResultCommandRepositoryGateway.updateGeneralUrbanRetirementReviewResult(
        resultEntity.id,
        resultEntity,
      ),
    ]);

    await transaction.commit();

    return CreateGeneralUrbanRetirementReviewFirstAnalysisResponseDto.build({
      generalUrbanRetirementReviewFirstAnalysis: cleanedFirstAnalysis,
    });
  }

  private parseFirstAnalysisOrThrow(firstAnalysisRaw: string): string {
    try {
      let cleanedJson = firstAnalysisRaw;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const parsed = JSON.parse(cleanedJson) as unknown;

      return JSON.stringify(parsed);
    } catch {
      throw new InvalidGeneralUrbanRetirementReviewFirstAnalysisJsonError();
    }
  }
}
