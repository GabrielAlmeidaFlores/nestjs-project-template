import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TeacherRetirementPlanningRejectionId extends Guid {
  protected override readonly _type = TeacherRetirementPlanningRejectionId.name;
}
