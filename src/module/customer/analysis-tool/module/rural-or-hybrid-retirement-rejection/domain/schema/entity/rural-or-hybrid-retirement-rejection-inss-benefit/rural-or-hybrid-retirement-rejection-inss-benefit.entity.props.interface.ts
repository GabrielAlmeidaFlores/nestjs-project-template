import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import type { RuralOrHybridRetirementRejectionInssBenefitId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-inss-benefit/value-object/rural-or-hybrid-retirement-rejection-inss-benefit-id.value-object';

export interface RuralOrHybridRetirementRejectionInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementRejectionInssBenefitId> {
  inssBenefit?: string | null;
  ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;
}
