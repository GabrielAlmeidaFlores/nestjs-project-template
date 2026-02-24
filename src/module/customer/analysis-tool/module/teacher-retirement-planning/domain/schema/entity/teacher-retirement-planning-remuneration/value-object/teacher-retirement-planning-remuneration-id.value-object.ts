import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TeacherRetirementPlanningRemunerationId extends Guid {
  protected override readonly _type =
    TeacherRetirementPlanningRemunerationId.name;
}
