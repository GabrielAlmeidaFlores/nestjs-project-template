import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { SpecialCategoryRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/query/special-category-retirement-analysis.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result/command/special-category-retirement-analysis-result.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result/query/special-category-retirement-analysis-result.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { SpecialCategoryRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/special-category-retirement-analysis-result.entity';
import { GenerateSpecialCategoryRetirementAnalysisFullTextResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/generate-special-category-retirement-analysis-full-text.response.dto';
import { SpecialCategoryRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/special-category-retirement-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GenerateSpecialCategoryRetirementAnalysisFullTextUseCase {
  protected readonly _type =
    GenerateSpecialCategoryRetirementAnalysisFullTextUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisQueryRepositoryGateway)
    private readonly specialCategoryRetirementAnalysisQueryRepositoryGateway: SpecialCategoryRetirementAnalysisQueryRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisResultQueryRepositoryGateway)
    private readonly resultQueryRepositoryGateway: SpecialCategoryRetirementAnalysisResultQueryRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisResultCommandRepositoryGateway)
    private readonly resultCommandRepositoryGateway: SpecialCategoryRetirementAnalysisResultCommandRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    analysisId: SpecialCategoryRetirementAnalysisId,
  ): Promise<GenerateSpecialCategoryRetirementAnalysisFullTextResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.SPECIAL_CATEGORY_RETIREMENT_COMPLETE_ANALYSIS,
      );

    const queryResult =
      await this.specialCategoryRetirementAnalysisQueryRepositoryGateway.findOneByIdAndOrganizationIdWithRelationsOrFail(
        analysisId,
        organizationSessionData.organizationId,
        SpecialCategoryRetirementAnalysisNotFoundError,
      );

    const creditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.SPECIAL_CATEGORY_RETIREMENT_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const existingResult =
      await this.resultQueryRepositoryGateway.findOneByAnalysisIdOrNull(
        analysisId,
      );

    let resultEntity: SpecialCategoryRetirementAnalysisResultEntity;

    if (existingResult !== null) {
      resultEntity = new SpecialCategoryRetirementAnalysisResultEntity({
        id: existingResult.specialCategoryRetirementAnalysisResultId,
        specialCategoryRetirementAnalysisId: analysisId,
        simplifiedAnalysisSummaryText:
          existingResult.simplifiedAnalysisSummaryText,
        fullAnalysisConclusionText: null,
        administrativeProcedureAnalysis:
          existingResult.administrativeProcedureAnalysis,
        createdAt: existingResult.createdAt,
        updatedAt: new Date(),
      });

      const clearTransaction =
        await this.baseTransactionRepositoryGateway.execute([
          creditTransaction,
          this.resultCommandRepositoryGateway.updateSpecialCategoryRetirementAnalysisResult(
            existingResult.specialCategoryRetirementAnalysisResultId,
            resultEntity,
          ),
        ]);

      await clearTransaction.commit();
    } else {
      resultEntity = new SpecialCategoryRetirementAnalysisResultEntity({
        specialCategoryRetirementAnalysisId: analysisId,
        simplifiedAnalysisSummaryText: null,
        fullAnalysisConclusionText: null,
      });

      const createTransaction =
        await this.baseTransactionRepositoryGateway.execute([
          creditTransaction,
          this.resultCommandRepositoryGateway.createSpecialCategoryRetirementAnalysisResult(
            resultEntity,
          ),
        ]);

      await createTransaction.commit();
    }

    const contextBuffer = Buffer.from(
      JSON.stringify(
        {
          analysis: queryResult,
          workPeriods: queryResult.workPeriods,
          remunerations: queryResult.remunerations,
        },
        null,
        2,
      ),
      'utf-8',
    );

    const analysisText =
      await this.analysisProcessorGateway.getSpecialActivityCompleteAnalysis(
        promptResponse.prompt,
        [contextBuffer],
        false,
      );

    const updatedResultEntity =
      new SpecialCategoryRetirementAnalysisResultEntity({
        id: resultEntity.id,
        specialCategoryRetirementAnalysisId: analysisId,
        simplifiedAnalysisSummaryText:
          resultEntity.simplifiedAnalysisSummaryText,
        fullAnalysisConclusionText: analysisText,
        administrativeProcedureAnalysis:
          resultEntity.administrativeProcedureAnalysis,
        createdAt: resultEntity.createdAt,
        updatedAt: new Date(),
      });

    const updateTransaction =
      await this.baseTransactionRepositoryGateway.execute(
        this.resultCommandRepositoryGateway.updateSpecialCategoryRetirementAnalysisResult(
          resultEntity.id,
          updatedResultEntity,
        ),
      );

    await updateTransaction.commit();

    return GenerateSpecialCategoryRetirementAnalysisFullTextResponseDto.build({
      specialCategoryRetirementAnalysisResultId: updatedResultEntity.id,
    });
  }
}
