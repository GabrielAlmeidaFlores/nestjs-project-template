import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

import type { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import type { DisabilityRetirementPlanningInssBenefitId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-inss-benefit/value-object/disability-retirement-planning-inss-benefit-id.value-object';

export interface DisabilityRetirementPlanningInssBenefitEntityPropsInterface
  extends BaseEntityPropsInterface<DisabilityRetirementPlanningInssBenefitId> {
  disabilityRetirementPlanning: DisabilityRetirementPlanningEntity;
  benefitNumber: string;
}
