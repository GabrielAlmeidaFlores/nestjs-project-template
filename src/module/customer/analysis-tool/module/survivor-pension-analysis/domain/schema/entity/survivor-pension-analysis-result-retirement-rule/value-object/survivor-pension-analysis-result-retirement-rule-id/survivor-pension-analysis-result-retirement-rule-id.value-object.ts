import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SurvivorPensionAnalysisResultRetirementRuleId extends Guid {
  protected override readonly _type =
    SurvivorPensionAnalysisResultRetirementRuleId.name;
}
