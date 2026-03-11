import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialCategoryRetirementAnalysisId extends Guid {
  protected override readonly _type = SpecialCategoryRetirementAnalysisId.name;

  public constructor(value?: string) {
    super(value);
  }
}
