import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionInssBenefitId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-inss-benefit/value-object/special-retirement-rejection-inss-benefit-id.value-object';

export interface SpecialRetirementRejectionInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementRejectionInssBenefitId> {
  benefitNumber?: string | null;
  specialRetirementRejectionId?: SpecialRetirementRejectionId | null;
}
