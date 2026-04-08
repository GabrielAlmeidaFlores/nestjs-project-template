import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitPeriodEarningsHistoryId extends Guid {
  protected override readonly _type = DeathBenefitPeriodEarningsHistoryId.name;
}
