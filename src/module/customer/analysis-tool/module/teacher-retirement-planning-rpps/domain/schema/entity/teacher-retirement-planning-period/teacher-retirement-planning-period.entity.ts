import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRppsPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/value-object/teacher-retirement-planning-period-id.value-object';

import type { TeacherRetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningRppsPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/enum/teacher-retirement-planning-period-service-type.enum';
import type { TeacherRetirementPlanningRppsPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/teacher-retirement-planning-period.entity.props.interface';

export class TeacherRetirementPlanningRppsPeriodEntity extends BaseEntity<TeacherRetirementPlanningRppsPeriodId> {
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly positionName: string | null;
  public readonly careerName: string | null;
  public readonly serviceType: TeacherRetirementPlanningRppsPeriodServiceTypeEnum | null;
  public readonly department: string | null;
  public readonly teacherRetirementPlanning: TeacherRetirementPlanningRppsEntity;

  protected readonly _type = TeacherRetirementPlanningRppsPeriodEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRppsPeriodEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRppsPeriodId, props);
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.positionName = props.positionName ?? null;
    this.careerName = props.careerName ?? null;
    this.serviceType = props.serviceType ?? null;
    this.department = props.department ?? null;
    this.teacherRetirementPlanning = props.teacherRetirementPlanning;
  }
}
