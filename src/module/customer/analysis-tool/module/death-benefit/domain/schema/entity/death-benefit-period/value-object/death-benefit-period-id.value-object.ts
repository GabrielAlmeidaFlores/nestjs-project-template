import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitPeriodId extends Guid {
  protected override readonly _type = DeathBenefitPeriodId.name;
}
