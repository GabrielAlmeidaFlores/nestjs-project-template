import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementAnalysisPeriodId extends Guid {
  protected override readonly _type =
    GeneralUrbanRetirementAnalysisPeriodId.name;
}
