import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetTeacherRetirementPlanningPeriodItemQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period-item/query/result/get-teacher-retirement-planning-period-item.query.result';
import type { TeacherRetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/enum/teacher-retirement-planning-period-service-type.enum';
import type { TeacherRetirementPlanningPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/value-object/teacher-retirement-planning-period-id.value-object';

export class GetTeacherRetirementPlanningPeriodQueryResult extends BaseBuildableObject {
  public readonly id: TeacherRetirementPlanningPeriodId;
  public readonly startDate: Date;
  public readonly endDate: Date;
  public readonly positionName: string;
  public readonly careerName: string;
  public readonly serviceType: TeacherRetirementPlanningPeriodServiceTypeEnum;
  public readonly department: string;
  public readonly items: GetTeacherRetirementPlanningPeriodItemQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetTeacherRetirementPlanningPeriodQueryResult.name;
}
