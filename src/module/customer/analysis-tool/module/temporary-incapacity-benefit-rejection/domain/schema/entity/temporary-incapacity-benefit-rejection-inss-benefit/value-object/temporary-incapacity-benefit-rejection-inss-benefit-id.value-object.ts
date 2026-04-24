import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryIncapacityBenefitRejectionInssBenefitId extends Guid {
  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionInssBenefitId.name;
}
