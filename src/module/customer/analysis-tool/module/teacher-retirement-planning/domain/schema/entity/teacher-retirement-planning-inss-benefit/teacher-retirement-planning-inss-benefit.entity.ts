import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningInssBenefitId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-inss-benefit/value-object/teacher-retirement-planning-inss-benefit-id.value-object';

import type { TeacherRetirementPlanningEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-inss-benefit/teacher-retirement-planning-inss-benefit.entity.props.interface';

export class TeacherRetirementPlanningInssBenefitEntity extends BaseEntity<TeacherRetirementPlanningInssBenefitId> {
  public readonly inssBenefitNumber: string;
  public readonly teacherRetirementPlanning: TeacherRetirementPlanningEntity;

  protected readonly _type = TeacherRetirementPlanningInssBenefitEntity.name;

  public constructor(
    props: TeacherRetirementPlanningInssBenefitEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningInssBenefitId, props);
    this.inssBenefitNumber = props.inssBenefitNumber;
    this.teacherRetirementPlanning = props.teacherRetirementPlanning;
  }
}
