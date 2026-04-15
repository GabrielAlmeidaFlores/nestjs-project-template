import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementDenialId extends Guid {
  protected override readonly _type = GeneralUrbanRetirementDenialId.name;
}
