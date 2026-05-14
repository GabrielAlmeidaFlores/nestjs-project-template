import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TeacherRetirementPlanningRppsPeriodItemDocumentId extends Guid {
  protected override readonly _type =
    TeacherRetirementPlanningRppsPeriodItemDocumentId.name;
}
