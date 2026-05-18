import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitGrantInssBenefitId extends Guid {
  protected override readonly _type = DeathBenefitGrantInssBenefitId.name;
}
