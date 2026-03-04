import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialCategoryRetirementAnalysisWorkPeriodId extends Guid {
  protected override readonly _type = SpecialCategoryRetirementAnalysisWorkPeriodId.name;

  public constructor(value?: string) {
    super(value);
  }
}
