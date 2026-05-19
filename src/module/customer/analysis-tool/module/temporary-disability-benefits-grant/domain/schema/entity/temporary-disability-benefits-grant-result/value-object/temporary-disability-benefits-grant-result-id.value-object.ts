import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryDisabilityBenefitsGrantResultId extends Guid {
  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantResultId.name;
}
