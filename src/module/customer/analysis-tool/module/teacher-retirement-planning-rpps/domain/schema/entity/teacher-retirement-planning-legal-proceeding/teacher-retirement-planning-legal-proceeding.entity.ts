import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRppsLegalProceedingId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-legal-proceeding/value-object/teacher-retirement-planning-legal-proceeding-id.value-object';

import type { TeacherRetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningRppsLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-legal-proceeding/teacher-retirement-planning-legal-proceeding.entity.props.interface';

export class TeacherRetirementPlanningRppsLegalProceedingEntity extends BaseEntity<TeacherRetirementPlanningRppsLegalProceedingId> {
  public readonly legalProceedingNumber: string;
  public readonly teacherRetirementPlanning: TeacherRetirementPlanningRppsEntity;

  protected readonly _type =
    TeacherRetirementPlanningRppsLegalProceedingEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRppsLegalProceedingEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRppsLegalProceedingId, props);
    this.legalProceedingNumber = props.legalProceedingNumber;
    this.teacherRetirementPlanning = props.teacherRetirementPlanning;
  }
}
