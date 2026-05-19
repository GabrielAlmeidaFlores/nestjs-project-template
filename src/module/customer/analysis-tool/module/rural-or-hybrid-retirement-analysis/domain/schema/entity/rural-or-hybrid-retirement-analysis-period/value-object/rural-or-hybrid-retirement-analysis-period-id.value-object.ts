import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralOrHybridRetirementAnalysisPeriodId extends Guid {
  protected override readonly _type =
    RuralOrHybridRetirementAnalysisPeriodId.name;
}
