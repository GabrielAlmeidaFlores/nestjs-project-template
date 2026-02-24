import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/enum/teacher-retirement-planning-period-service-type.enum';
import { TeacherRetirementPlanningPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/value-object/teacher-retirement-planning-period-id.value-object';

import type { TeacherRetirementPlanningPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/teacher-retirement-planning-period.entity.props.interface';
import type { TeacherRetirementPlanningEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';

export class TeacherRetirementPlanningPeriodEntity extends BaseEntity<TeacherRetirementPlanningPeriodId> {
  public readonly startDate: Date;
  public readonly endDate: Date;
  public readonly positionName: string;
  public readonly careerName: string;
  public readonly serviceType: TeacherRetirementPlanningPeriodServiceTypeEnum;
  public readonly department: string;
  public readonly teacherRetirementPlanning: TeacherRetirementPlanningEntity;

  protected readonly _type = TeacherRetirementPlanningPeriodEntity.name;

  public constructor(props: TeacherRetirementPlanningPeriodEntityPropsInterface) {
    super(TeacherRetirementPlanningPeriodId, props);
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.positionName = props.positionName;
    this.careerName = props.careerName;
    this.serviceType = props.serviceType;
    this.department = props.department;
    this.teacherRetirementPlanning = props.teacherRetirementPlanning;
  }
}
