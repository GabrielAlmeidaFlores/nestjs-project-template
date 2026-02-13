import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPlanningRgpsEarningsHistoryId extends Guid {
  protected override readonly _type =
    RetirementPlanningRgpsEarningsHistoryId.name;
}
