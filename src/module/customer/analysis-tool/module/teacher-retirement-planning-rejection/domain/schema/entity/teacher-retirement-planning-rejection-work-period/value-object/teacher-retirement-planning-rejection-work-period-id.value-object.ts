import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TeacherRetirementPlanningRejectionWorkPeriodId extends Guid {
  protected override readonly _type =
    TeacherRetirementPlanningRejectionWorkPeriodId.name;
}
