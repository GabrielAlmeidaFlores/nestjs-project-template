import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TeacherRetirementPlanningDocumentId extends Guid {
  protected override readonly _type = TeacherRetirementPlanningDocumentId.name;
}
