import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { SpecialCategoryRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/query/special-category-retirement-analysis.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result/command/special-category-retirement-analysis-result.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result/query/special-category-retirement-analysis-result.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultRuleItemCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-rule-item/command/special-category-retirement-analysis-result-rule-item.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { SpecialCategoryRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/special-category-retirement-analysis-result.entity';
import { SpecialCategoryRetirementAnalysisResultRuleItemEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-rule-item/special-category-retirement-analysis-result-rule-item.entity';
import { GenerateSpecialCategoryRetirementAnalysisRulesResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/generate-special-category-retirement-analysis-rules.response.dto';
import { SpecialCategoryRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/special-category-retirement-analysis-not-found.error';
import { SpecialCategoryRetirementAnalysisResultNotFoundError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/special-category-retirement-analysis-result-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

interface RuleItemDataInterface {
  retirementModalityName: string;
  isRequirementMet: boolean;
  projectedRetirementDate?: string | null;
  estimatedRmiAmount?: number | null;
  isBestFinancialOption: boolean;
  ruleDetailedExplanationText?: string | null;
}

@Injectable()
export class GenerateSpecialCategoryRetirementAnalysisRulesUseCase {
  protected readonly _type =
    GenerateSpecialCategoryRetirementAnalysisRulesUseCase.name;

  private readonly BATCH_SIZE: number;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisQueryRepositoryGateway)
    private readonly specialCategoryRetirementAnalysisQueryRepositoryGateway: SpecialCategoryRetirementAnalysisQueryRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisResultQueryRepositoryGateway)
    private readonly resultQueryRepositoryGateway: SpecialCategoryRetirementAnalysisResultQueryRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisResultCommandRepositoryGateway)
    private readonly resultCommandRepositoryGateway: SpecialCategoryRetirementAnalysisResultCommandRepositoryGateway,
    @Inject(
      SpecialCategoryRetirementAnalysisResultRuleItemCommandRepositoryGateway,
    )
    private readonly ruleItemCommandRepositoryGateway: SpecialCategoryRetirementAnalysisResultRuleItemCommandRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
  ) {
    this.BATCH_SIZE = 10;
  }

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    analysisId: SpecialCategoryRetirementAnalysisId,
  ): Promise<GenerateSpecialCategoryRetirementAnalysisRulesResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.SPECIAL_CATEGORY_RETIREMENT_RULES_ANALYSIS,
      );

    const queryResult =
      await this.specialCategoryRetirementAnalysisQueryRepositoryGateway.findOneByIdAndOrganizationIdWithRelationsOrFail(
        analysisId,
        organizationSessionData.organizationId,
        SpecialCategoryRetirementAnalysisNotFoundError,
      );

    const existingResult =
      await this.resultQueryRepositoryGateway.findOneByAnalysisIdOrNull(
        analysisId,
      );

    if (existingResult === null) {
      throw new SpecialCategoryRetirementAnalysisResultNotFoundError();
    }

    const creditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.SPECIAL_CATEGORY_RETIREMENT_RULES_ANALYSIS,
        organizationMember.id,
      );

    const resultEntity = new SpecialCategoryRetirementAnalysisResultEntity({
      id: existingResult.specialCategoryRetirementAnalysisResultId,
      specialCategoryRetirementAnalysisId: analysisId,
      simplifiedAnalysisSummaryText:
        existingResult.simplifiedAnalysisSummaryText,
      fullAnalysisConclusionText: existingResult.fullAnalysisConclusionText,
      administrativeProcedureAnalysis:
        existingResult.administrativeProcedureAnalysis,
      createdAt: existingResult.createdAt,
      updatedAt: new Date(),
    });

    const creditAndUpdateTransaction =
      await this.baseTransactionRepositoryGateway.execute([
        creditTransaction,
        this.resultCommandRepositoryGateway.updateSpecialCategoryRetirementAnalysisResult(
          existingResult.specialCategoryRetirementAnalysisResultId,
          resultEntity,
        ),
      ]);

    await creditAndUpdateTransaction.commit();

    const workPeriodBatches = this.createBatches(
      queryResult.workPeriods,
      this.BATCH_SIZE,
    );
    const allNewItemEntities: SpecialCategoryRetirementAnalysisResultRuleItemEntity[] =
      [];

    for (const batch of workPeriodBatches) {
      const contextBuffer = Buffer.from(
        JSON.stringify(
          {
            analysis: queryResult,
            workPeriodsBatch: batch,
            remunerations: queryResult.remunerations,
          },
          null,
          2,
        ),
        'utf-8',
      );

      const jsonResult =
        await this.analysisProcessorGateway.getSpecialCategoryRetirementRulesAnalysis(
          promptResponse.prompt,
          [contextBuffer],
        );

      if (jsonResult === null) {
        continue;
      }

      const parsed = JSON.parse(jsonResult) as {
        items?: RuleItemDataInterface[];
      };
      const items: RuleItemDataInterface[] = Array.isArray(parsed)
        ? parsed
        : (parsed.items ?? []);

      allNewItemEntities.push(
        ...items.map(
          (item) =>
            new SpecialCategoryRetirementAnalysisResultRuleItemEntity({
              specialCategoryRetirementAnalysisResultId: resultEntity.id,
              retirementModalityName: item.retirementModalityName,
              isRequirementMet: item.isRequirementMet,
              projectedRetirementDate:
                item.projectedRetirementDate !== undefined &&
                item.projectedRetirementDate !== null
                  ? new Date(item.projectedRetirementDate)
                  : null,
              estimatedRmiAmount:
                item.estimatedRmiAmount !== undefined &&
                item.estimatedRmiAmount !== null
                  ? new DecimalValue(item.estimatedRmiAmount)
                  : null,
              isBestFinancialOption: item.isBestFinancialOption,
              ruleDetailedExplanationText:
                item.ruleDetailedExplanationText ?? null,
            }),
        ),
      );
    }

    const replaceTransaction =
      await this.baseTransactionRepositoryGateway.execute([
        this.ruleItemCommandRepositoryGateway.deleteAllByResultId(
          existingResult.specialCategoryRetirementAnalysisResultId,
        ),
        ...allNewItemEntities.map((entity) =>
          this.ruleItemCommandRepositoryGateway.createSpecialCategoryRetirementAnalysisResultRuleItem(
            entity,
          ),
        ),
      ]);

    await replaceTransaction.commit();

    return GenerateSpecialCategoryRetirementAnalysisRulesResponseDto.build({
      specialCategoryRetirementAnalysisResultId: resultEntity.id,
      processedItemsCount: allNewItemEntities.length,
    });
  }

  private createBatches<T>(items: T[], size: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < items.length; i += size) {
      batches.push(items.slice(i, i + size));
    }
    return batches;
  }
}
