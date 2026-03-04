import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialCategoryRetirementAnalysisResultRuleItemId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-rule-item/value-object/special-category-retirement-analysis-result-rule-item-id/special-category-retirement-analysis-result-rule-item-id.value-object';

import type { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';
import type { SpecialCategoryRetirementAnalysisResultRuleItemEntityPropsInterface } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-rule-item/special-category-retirement-analysis-result-rule-item.entity.props.interface';

export class SpecialCategoryRetirementAnalysisResultRuleItemEntity extends BaseEntity<SpecialCategoryRetirementAnalysisResultRuleItemId> {
  public readonly specialCategoryRetirementAnalysisResultId: SpecialCategoryRetirementAnalysisResultId;
  public readonly retirementModalityName: string;
  public readonly isRequirementMet: boolean;
  public readonly projectedRetirementDate: Date | null;
  public readonly estimatedRmiAmount: number | null;
  public readonly isBestFinancialOption: boolean;
  public readonly ruleDetailedExplanationText: string | null;

  protected readonly _type =
    SpecialCategoryRetirementAnalysisResultRuleItemEntity.name;

  public constructor(
    props: SpecialCategoryRetirementAnalysisResultRuleItemEntityPropsInterface,
  ) {
    super(SpecialCategoryRetirementAnalysisResultRuleItemId, props);
    this.specialCategoryRetirementAnalysisResultId =
      props.specialCategoryRetirementAnalysisResultId;
    this.retirementModalityName = props.retirementModalityName;
    this.isRequirementMet = props.isRequirementMet;
    this.projectedRetirementDate = props.projectedRetirementDate ?? null;
    this.estimatedRmiAmount = props.estimatedRmiAmount ?? null;
    this.isBestFinancialOption = props.isBestFinancialOption;
    this.ruleDetailedExplanationText =
      props.ruleDetailedExplanationText ?? null;
  }
}
