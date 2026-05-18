import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialCategoryRetirementAnalysisResultId extends Guid {
  protected override readonly _type =
    SpecialCategoryRetirementAnalysisResultId.name;

  public constructor(value?: string) {
    super(value);
  }
}
