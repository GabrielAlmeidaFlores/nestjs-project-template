import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningPeriodItemId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/value-object/teacher-retirement-planning-period-item-id.value-object';

import type { TeacherRetirementPlanningPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/teacher-retirement-planning-period.entity';
import type { TeacherRetirementPlanningPeriodItemEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-education-level.enum';
import type { TeacherRetirementPlanningPeriodItemInstitutionTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-institution-type.enum';
import type { TeacherRetirementPlanningPeriodItemRolePerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-role-performed.enum';
import type { TeacherRetirementPlanningPeriodItemEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/teacher-retirement-planning-period-item.entity.props.interface';

export class TeacherRetirementPlanningPeriodItemEntity extends BaseEntity<TeacherRetirementPlanningPeriodItemId> {
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly institutionName: string | null;
  public readonly institutionType: TeacherRetirementPlanningPeriodItemInstitutionTypeEnum | null;
  public readonly educationLevel: TeacherRetirementPlanningPeriodItemEducationLevelEnum | null;
  public readonly rolePerformed: TeacherRetirementPlanningPeriodItemRolePerformedEnum | null;
  public readonly teacherRetirementPlanningPeriod: TeacherRetirementPlanningPeriodEntity;

  protected readonly _type = TeacherRetirementPlanningPeriodItemEntity.name;

  public constructor(
    props: TeacherRetirementPlanningPeriodItemEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningPeriodItemId, props);
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.institutionName = props.institutionName;
    this.institutionType = props.institutionType ?? null;
    this.educationLevel = props.educationLevel ?? null;
    this.rolePerformed = props.rolePerformed ?? null;
    this.teacherRetirementPlanningPeriod =
      props.teacherRetirementPlanningPeriod;
  }
}
