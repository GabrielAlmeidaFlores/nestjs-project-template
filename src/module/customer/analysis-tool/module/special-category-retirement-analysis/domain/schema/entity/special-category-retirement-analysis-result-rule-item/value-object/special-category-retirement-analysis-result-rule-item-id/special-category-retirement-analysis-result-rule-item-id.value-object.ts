import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialCategoryRetirementAnalysisResultRuleItemId extends Guid {
  protected override readonly _type =
    SpecialCategoryRetirementAnalysisResultRuleItemId.name;

  public constructor(value?: string) {
    super(value);
  }
}
