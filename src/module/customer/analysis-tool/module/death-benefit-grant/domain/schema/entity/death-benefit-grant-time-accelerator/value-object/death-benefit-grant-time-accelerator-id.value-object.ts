import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitGrantTimeAcceleratorId extends Guid {
  protected override readonly _type = DeathBenefitGrantTimeAcceleratorId.name;
}
