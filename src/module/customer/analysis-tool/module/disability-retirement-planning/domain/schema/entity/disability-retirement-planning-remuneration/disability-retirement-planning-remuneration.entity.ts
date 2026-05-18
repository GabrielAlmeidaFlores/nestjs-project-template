import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningRemunerationId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-remuneration/value-object/disability-retirement-planning-remuneration-id.value-object';

import type { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import type { DisabilityRetirementPlanningRemunerationEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-remuneration/disability-retirement-planning-remuneration.entity.props.interface';

export class DisabilityRetirementPlanningRemunerationEntity extends BaseEntity<DisabilityRetirementPlanningRemunerationId> {
  public readonly disabilityRetirementPlanning: DisabilityRetirementPlanningEntity;
  public readonly remunerationDate: Date;
  public readonly remunerationAmount: number;

  protected readonly _type =
    DisabilityRetirementPlanningRemunerationEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningRemunerationEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningRemunerationId, props);
    this.disabilityRetirementPlanning = props.disabilityRetirementPlanning;
    this.remunerationDate = props.remunerationDate;
    this.remunerationAmount = props.remunerationAmount;
  }
}
