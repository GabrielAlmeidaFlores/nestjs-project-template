import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TeacherRetirementPlanningPeriodId extends Guid {
  protected override readonly _type = TeacherRetirementPlanningPeriodId.name;
}
