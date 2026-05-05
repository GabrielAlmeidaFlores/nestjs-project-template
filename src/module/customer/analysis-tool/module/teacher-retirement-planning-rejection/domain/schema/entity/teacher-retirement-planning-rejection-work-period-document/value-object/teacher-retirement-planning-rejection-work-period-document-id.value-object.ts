import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TeacherRetirementPlanningRejectionWorkPeriodDocumentId extends Guid {
  protected override readonly _type =
    TeacherRetirementPlanningRejectionWorkPeriodDocumentId.name;
}
