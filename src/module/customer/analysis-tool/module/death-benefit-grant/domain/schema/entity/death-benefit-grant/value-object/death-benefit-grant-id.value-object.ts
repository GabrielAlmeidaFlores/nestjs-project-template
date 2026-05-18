import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitGrantId extends Guid {
  protected override readonly _type = DeathBenefitGrantId.name;
}
