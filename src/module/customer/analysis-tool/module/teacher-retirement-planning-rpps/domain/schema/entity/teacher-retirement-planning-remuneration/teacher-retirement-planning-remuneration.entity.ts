import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRppsRemunerationId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-remuneration/value-object/teacher-retirement-planning-remuneration-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { TeacherRetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningRppsRemunerationEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-remuneration/teacher-retirement-planning-remuneration.entity.props.interface';

export class TeacherRetirementPlanningRppsRemunerationEntity extends BaseEntity<TeacherRetirementPlanningRppsRemunerationId> {
  public readonly contributionDate: Date;
  public readonly amount: DecimalValue;
  public readonly teacherRetirementPlanning: TeacherRetirementPlanningRppsEntity;

  protected readonly _type =
    TeacherRetirementPlanningRppsRemunerationEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRppsRemunerationEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRppsRemunerationId, props);
    this.contributionDate = props.contributionDate;
    this.amount = props.amount;
    this.teacherRetirementPlanning = props.teacherRetirementPlanning;
  }
}
