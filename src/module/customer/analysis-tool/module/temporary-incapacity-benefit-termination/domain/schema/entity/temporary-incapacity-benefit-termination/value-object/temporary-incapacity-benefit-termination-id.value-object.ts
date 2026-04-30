import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryIncapacityBenefitTerminationId extends Guid {
  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationId.name;
}
