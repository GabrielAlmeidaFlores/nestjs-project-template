import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementAnalysisPeriodDocumentId extends Guid {
  protected override readonly _type =
    GeneralUrbanRetirementAnalysisPeriodDocumentId.name;
}
