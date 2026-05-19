import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import type { AccidentBenefitRejectionInssBenefitId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-inss-benefit/value-object/accident-benefit-rejection-inss-benefit-id.value-object';

export interface AccidentBenefitRejectionInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<AccidentBenefitRejectionInssBenefitId> {
  inssBenefit?: string | null;
  accidentBenefitRejectionId?: AccidentBenefitRejectionId | null;
}
