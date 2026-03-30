import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningPeriodItemId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/value-object/teacher-retirement-planning-period-item-id.value-object';

import type { TeacherRetirementPlanningPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/teacher-retirement-planning-period.entity';
import type { TeacherRetirementPlanningPeriodItemEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-education-level.enum';
import type { TeacherRetirementPlanningPeriodItemInstitutionTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-institution-type.enum';
import type { TeacherRetirementPlanningPeriodItemRolePerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-role-performed.enum';
import type { TeacherRetirementPlanningPeriodItemEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/teacher-retirement-planning-period-item.entity.props.interface';

export class TeacherRetirementPlanningPeriodItemEntity extends BaseEntity<TeacherRetirementPlanningPeriodItemId> {
  public readonly startDate: Date;
  public readonly endDate: Date;
  public readonly institutionName: string;
  public readonly institutionType: TeacherRetirementPlanningPeriodItemInstitutionTypeEnum;
  public readonly educationLevel: TeacherRetirementPlanningPeriodItemEducationLevelEnum;
  public readonly rolePerformed: TeacherRetirementPlanningPeriodItemRolePerformedEnum;
  public readonly teacherRetirementPlanningPeriod: TeacherRetirementPlanningPeriodEntity;

  protected readonly _type = TeacherRetirementPlanningPeriodItemEntity.name;

  public constructor(
    props: TeacherRetirementPlanningPeriodItemEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningPeriodItemId, props);
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.institutionName = props.institutionName;
    this.institutionType = props.institutionType;
    this.educationLevel = props.educationLevel;
    this.rolePerformed = props.rolePerformed;
    this.teacherRetirementPlanningPeriod =
      props.teacherRetirementPlanningPeriod;
  }
}
