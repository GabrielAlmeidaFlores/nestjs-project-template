import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { TeacherRetirementPlanningPeriodItemDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item-document/value-object/teacher-retirement-planning-period-item-document-id.value-object';

export class GetTeacherRetirementPlanningPeriodItemDocumentQueryResult extends BaseBuildableObject {
  public readonly id: TeacherRetirementPlanningPeriodItemDocumentId;
  public readonly document: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetTeacherRetirementPlanningPeriodItemDocumentQueryResult.name;
}
