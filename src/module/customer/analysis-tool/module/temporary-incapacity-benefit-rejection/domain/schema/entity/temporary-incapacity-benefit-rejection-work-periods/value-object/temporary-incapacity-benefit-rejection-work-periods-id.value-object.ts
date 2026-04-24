import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryIncapacityBenefitRejectionWorkPeriodsId extends Guid {
  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionWorkPeriodsId.name;
}
