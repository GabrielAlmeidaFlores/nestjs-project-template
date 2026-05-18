import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class PermanentIncapacityBenefitTerminatedInssBenefitId extends Guid {
  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedInssBenefitId.name;
}
