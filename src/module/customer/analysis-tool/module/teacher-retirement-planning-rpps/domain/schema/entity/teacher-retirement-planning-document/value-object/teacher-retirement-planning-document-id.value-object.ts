import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TeacherRetirementPlanningRppsDocumentId extends Guid {
  protected override readonly _type =
    TeacherRetirementPlanningRppsDocumentId.name;
}
