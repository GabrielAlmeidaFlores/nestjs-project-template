import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitBenefitInstitorId extends Guid {
  protected override readonly _type = DeathBenefitBenefitInstitorId.name;
}
