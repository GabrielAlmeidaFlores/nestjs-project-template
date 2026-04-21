import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitRejectionInssBenefitId extends Guid {
  protected override readonly _type = DeathBenefitRejectionInssBenefitId.name;
}
