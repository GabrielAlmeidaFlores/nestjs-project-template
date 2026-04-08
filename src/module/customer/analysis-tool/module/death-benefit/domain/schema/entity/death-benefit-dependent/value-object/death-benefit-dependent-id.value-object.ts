import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitDependentId extends Guid {
  protected override readonly _type = DeathBenefitDependentId.name;
}
