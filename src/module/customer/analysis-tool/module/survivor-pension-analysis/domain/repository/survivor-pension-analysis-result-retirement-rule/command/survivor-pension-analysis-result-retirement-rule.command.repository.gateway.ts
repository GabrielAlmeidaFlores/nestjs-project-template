import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import type { SurvivorPensionAnalysisResultRetirementRuleEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-retirement-rule/survivor-pension-analysis-result-retirement-rule.entity';
import type { SurvivorPensionAnalysisResultRetirementRuleId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-retirement-rule/value-object/survivor-pension-analysis-result-retirement-rule-id/survivor-pension-analysis-result-retirement-rule-id.value-object';

export abstract class SurvivorPensionAnalysisResultRetirementRuleCommandRepositoryGateway {
  public abstract createSurvivorPensionAnalysisResultRetirementRule(
    props: SurvivorPensionAnalysisResultRetirementRuleEntity,
  ): TransactionType;

  public abstract deleteSurvivorPensionAnalysisResultRetirementRule(
    id: SurvivorPensionAnalysisResultRetirementRuleId,
  ): TransactionType;

  public abstract deleteAllBySurvivorPensionAnalysisResultId(
    survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId,
  ): TransactionType;
}
