import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitGrantPeriodId extends Guid {
  protected override readonly _type = DeathBenefitGrantPeriodId.name;
}
