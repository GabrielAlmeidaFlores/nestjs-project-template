import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { TeacherRetirementPlanningRppsRemunerationId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-remuneration/value-object/teacher-retirement-planning-remuneration-id.value-object';

export class GetTeacherRetirementPlanningRppsRemunerationQueryResult extends BaseBuildableObject {
  public readonly id: TeacherRetirementPlanningRppsRemunerationId;
  public readonly contributionDate: Date;
  public readonly amount: DecimalValue;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetTeacherRetirementPlanningRppsRemunerationQueryResult.name;
}
