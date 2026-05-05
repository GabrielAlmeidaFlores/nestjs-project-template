import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TeacherRetirementPlanningRejectionResultId extends Guid {
  protected override readonly _type =
    TeacherRetirementPlanningRejectionResultId.name;
}
