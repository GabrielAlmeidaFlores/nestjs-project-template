import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningLegalProceedingId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-legal-proceeding/value-object/teacher-retirement-planning-legal-proceeding-id.value-object';

import type { TeacherRetirementPlanningEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-legal-proceeding/teacher-retirement-planning-legal-proceeding.entity.props.interface';

export class TeacherRetirementPlanningLegalProceedingEntity extends BaseEntity<TeacherRetirementPlanningLegalProceedingId> {
  public readonly legalProceedingNumber: string;
  public readonly teacherRetirementPlanning: TeacherRetirementPlanningEntity;

  protected readonly _type =
    TeacherRetirementPlanningLegalProceedingEntity.name;

  public constructor(
    props: TeacherRetirementPlanningLegalProceedingEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningLegalProceedingId, props);
    this.legalProceedingNumber = props.legalProceedingNumber;
    this.teacherRetirementPlanning = props.teacherRetirementPlanning;
  }
}
