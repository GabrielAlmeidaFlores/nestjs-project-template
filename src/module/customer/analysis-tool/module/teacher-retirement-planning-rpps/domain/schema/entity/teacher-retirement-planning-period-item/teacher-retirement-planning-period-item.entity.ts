import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRppsPeriodItemId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/value-object/teacher-retirement-planning-period-item-id.value-object';

import type { TeacherRetirementPlanningRppsPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/teacher-retirement-planning-period.entity';
import type { TeacherRetirementPlanningRppsPeriodItemEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-education-level.enum';
import type { TeacherRetirementPlanningRppsPeriodItemInstitutionTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-institution-type.enum';
import type { TeacherRetirementPlanningRppsPeriodItemRolePerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-role-performed.enum';
import type { TeacherRetirementPlanningRppsPeriodItemEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/teacher-retirement-planning-period-item.entity.props.interface';

export class TeacherRetirementPlanningRppsPeriodItemEntity extends BaseEntity<TeacherRetirementPlanningRppsPeriodItemId> {
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly institutionName: string | null;
  public readonly institutionType: TeacherRetirementPlanningRppsPeriodItemInstitutionTypeEnum | null;
  public readonly educationLevel: TeacherRetirementPlanningRppsPeriodItemEducationLevelEnum | null;
  public readonly rolePerformed: TeacherRetirementPlanningRppsPeriodItemRolePerformedEnum | null;
  public readonly teacherRetirementPlanningPeriod: TeacherRetirementPlanningRppsPeriodEntity;

  protected readonly _type = TeacherRetirementPlanningRppsPeriodItemEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRppsPeriodItemEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRppsPeriodItemId, props);
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.institutionName = props.institutionName ?? null;
    this.institutionType = props.institutionType ?? null;
    this.educationLevel = props.educationLevel ?? null;
    this.rolePerformed = props.rolePerformed ?? null;
    this.teacherRetirementPlanningPeriod =
      props.teacherRetirementPlanningPeriod;
  }
}
