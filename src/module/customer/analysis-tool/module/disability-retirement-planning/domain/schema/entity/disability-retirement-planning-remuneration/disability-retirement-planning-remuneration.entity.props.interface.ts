import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import type { DisabilityRetirementPlanningRemunerationId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-remuneration/value-object/disability-retirement-planning-remuneration-id.value-object';

export interface DisabilityRetirementPlanningRemunerationEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningRemunerationId> {
  disabilityRetirementPlanning: DisabilityRetirementPlanningEntity;
  remunerationDate: Date;
  remunerationAmount: number;
}
