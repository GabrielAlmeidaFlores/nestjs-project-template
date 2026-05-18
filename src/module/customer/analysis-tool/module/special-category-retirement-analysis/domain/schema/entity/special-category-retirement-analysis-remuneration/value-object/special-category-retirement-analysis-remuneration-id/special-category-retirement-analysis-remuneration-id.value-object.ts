import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialCategoryRetirementAnalysisRemunerationId extends Guid {
  protected override readonly _type =
    SpecialCategoryRetirementAnalysisRemunerationId.name;

  public constructor(value?: string) {
    super(value);
  }
}
