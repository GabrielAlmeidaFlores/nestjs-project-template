import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementDenialPeriodDocumentId extends Guid {
  protected override readonly _type =
    GeneralUrbanRetirementDenialPeriodDocumentId.name;
}
