import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class PerCapitaIncomeForBpcAnalysisBenefitId extends Guid {
  protected override readonly _type =
    PerCapitaIncomeForBpcAnalysisBenefitId.name;
}
