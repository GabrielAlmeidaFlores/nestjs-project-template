import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitGrantInstitorId extends Guid {
  protected override readonly _type = DeathBenefitGrantInstitorId.name;
}
