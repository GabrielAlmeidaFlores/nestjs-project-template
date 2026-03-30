import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import type { DisabilityRetirementPlanningGrantInssBenefitId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-inss-benefit/value-object/disability-retirement-planning-grant-inss-benefit-id.value-object';

export interface DisabilityRetirementPlanningGrantInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningGrantInssBenefitId> {
  inssBenefit: string;
  disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId;
}
