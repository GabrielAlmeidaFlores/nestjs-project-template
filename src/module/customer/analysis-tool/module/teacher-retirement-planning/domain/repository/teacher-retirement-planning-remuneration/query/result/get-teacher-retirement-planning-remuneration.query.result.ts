import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { TeacherRetirementPlanningRemunerationId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-remuneration/value-object/teacher-retirement-planning-remuneration-id.value-object';

export class GetTeacherRetirementPlanningRemunerationQueryResult extends BaseBuildableObject {
  public readonly id: TeacherRetirementPlanningRemunerationId;
  public readonly contributionDate: Date;
  public readonly amount: DecimalValue;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetTeacherRetirementPlanningRemunerationQueryResult.name;
}
