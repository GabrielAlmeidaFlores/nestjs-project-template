import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import { DisabilityRetirementPlanningRemunerationId } from './value-object/disability-retirement-planning-remuneration-id.value-object';

import type { DisabilityRetirementPlanningRemunerationEntityPropsInterface } from './disability-retirement-planning-remuneration.entity.props.interface';
import type { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';

export class DisabilityRetirementPlanningRemunerationEntity extends BaseEntity<DisabilityRetirementPlanningRemunerationId> {
  protected readonly _type =
    DisabilityRetirementPlanningRemunerationEntity.name;

  public readonly disabilityRetirementPlanning: DisabilityRetirementPlanningEntity;
  public readonly remunerationDate: Date;
  public readonly remunerationAmount: number;

  public constructor(
    props: DisabilityRetirementPlanningRemunerationEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningRemunerationId, props);
    this.disabilityRetirementPlanning = props.disabilityRetirementPlanning;
    this.remunerationDate = props.remunerationDate;
    this.remunerationAmount = props.remunerationAmount;
  }
}
