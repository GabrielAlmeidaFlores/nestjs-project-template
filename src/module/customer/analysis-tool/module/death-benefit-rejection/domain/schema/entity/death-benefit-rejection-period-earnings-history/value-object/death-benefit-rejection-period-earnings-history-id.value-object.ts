import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitRejectionPeriodEarningsHistoryId extends Guid {
  protected override readonly _type =
    DeathBenefitRejectionPeriodEarningsHistoryId.name;
}
