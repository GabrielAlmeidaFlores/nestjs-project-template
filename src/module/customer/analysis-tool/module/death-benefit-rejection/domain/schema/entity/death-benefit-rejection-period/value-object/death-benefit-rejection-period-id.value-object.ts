import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitRejectionPeriodId extends Guid {
  protected override readonly _type = DeathBenefitRejectionPeriodId.name;
}
