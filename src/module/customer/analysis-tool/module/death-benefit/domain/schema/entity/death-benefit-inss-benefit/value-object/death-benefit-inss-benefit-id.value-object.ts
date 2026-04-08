import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitInssBenefitId extends Guid {
  protected override readonly _type = DeathBenefitInssBenefitId.name;
}
