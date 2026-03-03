import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class PerCapitaIncomeForBpcAnalysisId extends Guid {
  protected override readonly _type = PerCapitaIncomeForBpcAnalysisId.name;
}
