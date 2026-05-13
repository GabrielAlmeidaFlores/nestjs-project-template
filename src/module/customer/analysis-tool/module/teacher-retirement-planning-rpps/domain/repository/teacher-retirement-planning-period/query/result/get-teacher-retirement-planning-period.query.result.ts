import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetTeacherRetirementPlanningRppsPeriodItemQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-period-item/query/result/get-teacher-retirement-planning-period-item.query.result';
import type { TeacherRetirementPlanningRppsPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/enum/teacher-retirement-planning-period-service-type.enum';
import type { TeacherRetirementPlanningRppsPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/value-object/teacher-retirement-planning-period-id.value-object';

export class GetTeacherRetirementPlanningRppsPeriodQueryResult extends BaseBuildableObject {
  public readonly id: TeacherRetirementPlanningRppsPeriodId;
  public readonly startDate: Date;
  public readonly endDate: Date;
  public readonly positionName: string;
  public readonly careerName: string;
  public readonly serviceType: TeacherRetirementPlanningRppsPeriodServiceTypeEnum;
  public readonly department: string;
  public readonly items: GetTeacherRetirementPlanningRppsPeriodItemQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetTeacherRetirementPlanningRppsPeriodQueryResult.name;
}
