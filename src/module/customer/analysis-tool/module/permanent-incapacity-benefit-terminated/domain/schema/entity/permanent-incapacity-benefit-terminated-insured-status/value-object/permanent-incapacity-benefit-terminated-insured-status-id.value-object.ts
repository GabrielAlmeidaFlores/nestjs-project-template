import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class PermanentIncapacityBenefitTerminatedInsuredStatusId extends Guid {
  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedInsuredStatusId.name;
}
