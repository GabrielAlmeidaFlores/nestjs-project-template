import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TeacherRetirementPlanningRppsPeriodId extends Guid {
  protected override readonly _type =
    TeacherRetirementPlanningRppsPeriodId.name;
}
