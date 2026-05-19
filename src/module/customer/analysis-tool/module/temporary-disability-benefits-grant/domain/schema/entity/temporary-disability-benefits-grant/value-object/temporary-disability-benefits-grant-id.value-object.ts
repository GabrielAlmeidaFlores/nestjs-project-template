import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryDisabilityBenefitsGrantId extends Guid {
  protected override readonly _type = TemporaryDisabilityBenefitsGrantId.name;
}
