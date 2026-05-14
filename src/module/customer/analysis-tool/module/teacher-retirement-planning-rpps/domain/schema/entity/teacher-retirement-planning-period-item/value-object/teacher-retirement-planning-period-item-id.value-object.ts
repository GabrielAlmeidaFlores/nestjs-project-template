import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TeacherRetirementPlanningRppsPeriodItemId extends Guid {
  protected override readonly _type =
    TeacherRetirementPlanningRppsPeriodItemId.name;
}
