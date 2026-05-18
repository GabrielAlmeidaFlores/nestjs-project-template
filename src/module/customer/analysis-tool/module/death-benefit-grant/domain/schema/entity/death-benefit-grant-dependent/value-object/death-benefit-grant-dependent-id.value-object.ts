import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitGrantDependentId extends Guid {
  protected override readonly _type = DeathBenefitGrantDependentId.name;
}
