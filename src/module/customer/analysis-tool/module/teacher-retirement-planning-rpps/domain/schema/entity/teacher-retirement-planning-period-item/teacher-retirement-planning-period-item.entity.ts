import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRppsPeriodItemId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/value-object/teacher-retirement-planning-period-item-id.value-object';

import type { TeacherRetirementPlanningRppsPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/teacher-retirement-planning-period.entity';
import type { TeacherRetirementPlanningRppsPeriodItemEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-education-level.enum';
import type { TeacherRetirementPlanningRppsPeriodItemInstitutionTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-institution-type.enum';
import type { TeacherRetirementPlanningRppsPeriodItemRolePerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-role-performed.enum';
import type { TeacherRetirementPlanningRppsPeriodItemEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/teacher-retirement-planning-period-item.entity.props.interface';

export class TeacherRetirementPlanningRppsPeriodItemEntity extends BaseEntity<TeacherRetirementPlanningRppsPeriodItemId> {
  public readonly startDate: Date;
  public readonly endDate: Date;
  public readonly institutionName: string;
  public readonly institutionType: TeacherRetirementPlanningRppsPeriodItemInstitutionTypeEnum;
  public readonly educationLevel: TeacherRetirementPlanningRppsPeriodItemEducationLevelEnum;
  public readonly rolePerformed: TeacherRetirementPlanningRppsPeriodItemRolePerformedEnum;
  public readonly teacherRetirementPlanningPeriod: TeacherRetirementPlanningRppsPeriodEntity;

  protected readonly _type = TeacherRetirementPlanningRppsPeriodItemEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRppsPeriodItemEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRppsPeriodItemId, props);
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
