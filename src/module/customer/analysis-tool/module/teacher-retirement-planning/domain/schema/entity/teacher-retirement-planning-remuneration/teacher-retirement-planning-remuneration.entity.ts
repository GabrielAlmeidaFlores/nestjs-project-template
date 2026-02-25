import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRemunerationId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-remuneration/value-object/teacher-retirement-planning-remuneration-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { TeacherRetirementPlanningEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningRemunerationEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-remuneration/teacher-retirement-planning-remuneration.entity.props.interface';

export class TeacherRetirementPlanningRemunerationEntity extends BaseEntity<TeacherRetirementPlanningRemunerationId> {
  public readonly contributionDate: Date;
  public readonly amount: DecimalValue;
  public readonly teacherRetirementPlanning: TeacherRetirementPlanningEntity;

  protected readonly _type = TeacherRetirementPlanningRemunerationEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRemunerationEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRemunerationId, props);
    this.contributionDate = props.contributionDate;
    this.amount = props.amount;
    this.teacherRetirementPlanning = props.teacherRetirementPlanning;
  }
}
