import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRejectionInssBenefitId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-inss-benefit/value-object/teacher-retirement-planning-rejection-inss-benefit-id.value-object';

import type { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import type { TeacherRetirementPlanningRejectionInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-inss-benefit/teacher-retirement-planning-rejection-inss-benefit.entity.props.interface';

export class TeacherRetirementPlanningRejectionInssBenefitEntity extends BaseEntity<TeacherRetirementPlanningRejectionInssBenefitId> {
  public readonly inssBenefit: string | null;
  public readonly teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId;

  protected readonly _type =
    TeacherRetirementPlanningRejectionInssBenefitEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRejectionInssBenefitEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRejectionInssBenefitId, props);
    this.inssBenefit = props.inssBenefit ?? null;
    this.teacherRetirementPlanningRejectionId =
      props.teacherRetirementPlanningRejectionId;
  }
}
