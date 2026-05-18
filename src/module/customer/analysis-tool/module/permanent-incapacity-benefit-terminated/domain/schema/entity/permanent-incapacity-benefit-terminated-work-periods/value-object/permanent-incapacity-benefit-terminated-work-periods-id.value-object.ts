import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class PermanentIncapacityBenefitTerminatedWorkPeriodsId extends Guid {
  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedWorkPeriodsId.name;
}
