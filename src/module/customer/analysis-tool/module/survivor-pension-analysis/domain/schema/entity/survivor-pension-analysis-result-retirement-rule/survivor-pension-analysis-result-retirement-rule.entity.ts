import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import { SurvivorPensionAnalysisResultRetirementRuleEntityPropsInterface } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-retirement-rule/survivor-pension-analysis-result-retirement-rule.entity.props.interface';
import { SurvivorPensionAnalysisResultRetirementRuleId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-retirement-rule/value-object/survivor-pension-analysis-result-retirement-rule-id/survivor-pension-analysis-result-retirement-rule-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SurvivorPensionAnalysisResultRetirementRuleEntity extends BaseEntity<SurvivorPensionAnalysisResultRetirementRuleId> {
  @Description('ID do resultado da análise de pensão por morte.')
  public readonly survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId;

  @Description('Nome da regra de aposentadoria.')
  public readonly ruleName: string | null;

  @Description('Indicador de cumprimento do requisito.')
  public readonly isRequirementMet: boolean | null;

  @Description('Data de elegibilidade.')
  public readonly entitlementDate: Date | null;

  @Description('RMI estimado.')
  public readonly estimatedRmi: DecimalValue | null;

  @Description('Indicador do melhor RMI.')
  public readonly isBestRmi: boolean | null;

  @Description('Indicador do maior valor de crédito.')
  public readonly isHighestClaimValue: boolean | null;

  @Description('Análise detalhada.')
  public readonly detailedAnalysis: string | null;

  protected readonly _type =
    SurvivorPensionAnalysisResultRetirementRuleEntity.name;

  public constructor(
    props: SurvivorPensionAnalysisResultRetirementRuleEntityPropsInterface,
  ) {
    super(SurvivorPensionAnalysisResultRetirementRuleId, props);
    this.survivorPensionAnalysisResultId =
      props.survivorPensionAnalysisResultId;
    this.ruleName = props.ruleName ?? null;
    this.isRequirementMet = props.isRequirementMet ?? null;
    this.entitlementDate = props.entitlementDate ?? null;
    this.estimatedRmi = props.estimatedRmi ?? null;
    this.isBestRmi = props.isBestRmi ?? null;
    this.isHighestClaimValue = props.isHighestClaimValue ?? null;
    this.detailedAnalysis = props.detailedAnalysis ?? null;
  }
}
