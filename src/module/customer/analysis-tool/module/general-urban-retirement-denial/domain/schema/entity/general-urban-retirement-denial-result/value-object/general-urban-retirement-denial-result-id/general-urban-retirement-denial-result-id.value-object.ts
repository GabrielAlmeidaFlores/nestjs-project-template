import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementDenialResultId extends Guid {
  protected override readonly _type = GeneralUrbanRetirementDenialResultId.name;
}
