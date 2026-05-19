import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementDenialDocumentId extends Guid {
  protected override readonly _type =
    GeneralUrbanRetirementDenialDocumentId.name;
}
