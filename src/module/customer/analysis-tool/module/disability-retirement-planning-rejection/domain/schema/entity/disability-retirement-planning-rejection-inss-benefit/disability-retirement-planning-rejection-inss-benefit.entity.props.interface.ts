import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import type { DisabilityRetirementPlanningRejectionInssBenefitId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-inss-benefit/value-object/disability-retirement-planning-rejection-inss-benefit-id.value-object';

export interface DisabilityRetirementPlanningRejectionInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningRejectionInssBenefitId> {
  inssBenefit: string;
  disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId;
}
