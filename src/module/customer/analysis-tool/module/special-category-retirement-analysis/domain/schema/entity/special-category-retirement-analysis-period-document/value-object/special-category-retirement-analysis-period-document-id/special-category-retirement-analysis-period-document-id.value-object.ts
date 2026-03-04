import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialCategoryRetirementAnalysisPeriodDocumentId extends Guid {
  protected override readonly _type =
    SpecialCategoryRetirementAnalysisPeriodDocumentId.name;

  public constructor(value?: string) {
    super(value);
  }
}
