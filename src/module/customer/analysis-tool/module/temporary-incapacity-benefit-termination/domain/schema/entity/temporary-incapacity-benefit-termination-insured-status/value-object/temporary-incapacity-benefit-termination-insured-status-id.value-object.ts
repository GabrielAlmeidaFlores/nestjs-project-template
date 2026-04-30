import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryIncapacityBenefitTerminationInsuredStatusId extends Guid {
  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationInsuredStatusId.name;
}
