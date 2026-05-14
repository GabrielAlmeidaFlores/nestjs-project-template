import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class PermanentIncapacityBenefitTerminatedResultId extends Guid {
  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedResultId.name;
}
