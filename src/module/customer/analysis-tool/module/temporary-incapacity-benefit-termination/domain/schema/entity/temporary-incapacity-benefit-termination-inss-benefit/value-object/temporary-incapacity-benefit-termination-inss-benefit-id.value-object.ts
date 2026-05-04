import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryIncapacityBenefitTerminationInssBenefitId extends Guid {
  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationInssBenefitId.name;
}
