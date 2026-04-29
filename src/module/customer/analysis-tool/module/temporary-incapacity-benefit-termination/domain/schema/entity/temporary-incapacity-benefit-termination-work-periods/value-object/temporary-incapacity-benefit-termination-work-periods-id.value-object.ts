import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryIncapacityBenefitTerminationWorkPeriodsId extends Guid {
  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationWorkPeriodsId.name;
}
