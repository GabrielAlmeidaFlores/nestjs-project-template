import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class PermanentIncapacityBenefitTerminatedId extends Guid {
  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedId.name;
}
