import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialCategoryRetirementAnalysisResultConversionItemId extends Guid {
  protected override readonly _type = SpecialCategoryRetirementAnalysisResultConversionItemId.name;

  public constructor(value?: string) {
    super(value);
  }
}
