import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TeacherRetirementPlanningPeriodItemId extends Guid {
  protected override readonly _type =
    TeacherRetirementPlanningPeriodItemId.name;
}
