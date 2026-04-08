import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { TeacherRetirementPlanningActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-activity-type.enum';
import type { TeacherRetirementPlanningFederativeEntityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-federative-entity.enum';
import type { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';

export class GetTeacherRetirementPlanningQueryResult extends BaseBuildableObject {
  public readonly id: TeacherRetirementPlanningId;
  public readonly federativeEntity: TeacherRetirementPlanningFederativeEntityEnum;
  public readonly state: StateCodeEnum | null;
  public readonly municipality: string | null;
  public readonly analysisName: string | null;
  public readonly currentPosition: string | null;
  public readonly activityType: TeacherRetirementPlanningActivityTypeEnum;
  public readonly publicServiceStartDate: Date | null;
  public readonly careerStartDate: Date | null;
  public readonly administrativeProcessAnalysis: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetTeacherRetirementPlanningQueryResult.name;
}
