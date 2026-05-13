import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRppsInssBenefitId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-inss-benefit/value-object/teacher-retirement-planning-inss-benefit-id.value-object';

import type { TeacherRetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningRppsInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-inss-benefit/teacher-retirement-planning-inss-benefit.entity.props.interface';

export class TeacherRetirementPlanningRppsInssBenefitEntity extends BaseEntity<TeacherRetirementPlanningRppsInssBenefitId> {
  public readonly inssBenefitNumber: string;
  public readonly teacherRetirementPlanning: TeacherRetirementPlanningRppsEntity;

  protected readonly _type = TeacherRetirementPlanningRppsInssBenefitEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRppsInssBenefitEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRppsInssBenefitId, props);
    this.inssBenefitNumber = props.inssBenefitNumber;
    this.teacherRetirementPlanning = props.teacherRetirementPlanning;
  }
}
