import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { TeacherRetirementPlanningRppsDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-document/value-object/teacher-retirement-planning-document-id.value-object';

export class GetTeacherRetirementPlanningRppsDocumentQueryResult extends BaseBuildableObject {
  public readonly id: TeacherRetirementPlanningRppsDocumentId;
  public readonly document: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetTeacherRetirementPlanningRppsDocumentQueryResult.name;
}
