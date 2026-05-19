import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TeacherRetirementPlanningRejectionDocumentId extends Guid {
  protected override readonly _type =
    TeacherRetirementPlanningRejectionDocumentId.name;
}
