import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRppsPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/value-object/teacher-retirement-planning-period-id.value-object';

import type { TeacherRetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningRppsPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/enum/teacher-retirement-planning-period-service-type.enum';
import type { TeacherRetirementPlanningRppsPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/teacher-retirement-planning-period.entity.props.interface';

export class TeacherRetirementPlanningRppsPeriodEntity extends BaseEntity<TeacherRetirementPlanningRppsPeriodId> {
  public readonly startDate: Date;
  public readonly endDate: Date;
  public readonly positionName: string;
  public readonly careerName: string;
  public readonly serviceType: TeacherRetirementPlanningRppsPeriodServiceTypeEnum;
  public readonly department: string;
  public readonly teacherRetirementPlanning: TeacherRetirementPlanningRppsEntity;

  protected readonly _type = TeacherRetirementPlanningRppsPeriodEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRppsPeriodEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRppsPeriodId, props);
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.positionName = props.positionName;
    this.careerName = props.careerName;
    this.serviceType = props.serviceType;
    this.department = props.department;
    this.teacherRetirementPlanning = props.teacherRetirementPlanning;
  }
}
