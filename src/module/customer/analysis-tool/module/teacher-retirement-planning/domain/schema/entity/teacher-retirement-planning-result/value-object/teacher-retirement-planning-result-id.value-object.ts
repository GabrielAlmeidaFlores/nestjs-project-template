import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TeacherRetirementPlanningResultId extends Guid {
  protected override readonly _type = TeacherRetirementPlanningResultId.name;
}
