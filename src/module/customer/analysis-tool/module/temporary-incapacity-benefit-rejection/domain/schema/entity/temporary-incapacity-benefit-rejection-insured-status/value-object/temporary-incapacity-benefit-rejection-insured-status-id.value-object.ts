import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryIncapacityBenefitRejectionInsuredStatusId extends Guid {
  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionInsuredStatusId.name;
}
