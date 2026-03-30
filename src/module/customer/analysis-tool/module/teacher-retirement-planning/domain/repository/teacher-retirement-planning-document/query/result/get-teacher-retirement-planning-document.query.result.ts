import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { TeacherRetirementPlanningDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-document/value-object/teacher-retirement-planning-document-id.value-object';

export class GetTeacherRetirementPlanningDocumentQueryResult extends BaseBuildableObject {
  public readonly id: TeacherRetirementPlanningDocumentId;
  public readonly document: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetTeacherRetirementPlanningDocumentQueryResult.name;
}
