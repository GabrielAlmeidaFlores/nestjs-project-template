import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class PerCapitaIncomeForBpcAnalysisDocumentId extends Guid {
  protected override readonly _type =
    PerCapitaIncomeForBpcAnalysisDocumentId.name;
}
