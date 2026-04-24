import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import type { TemporaryIncapacityBenefitRejectionInssBenefitId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-inss-benefit/value-object/temporary-incapacity-benefit-rejection-inss-benefit-id.value-object';

export interface TemporaryIncapacityBenefitRejectionInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitRejectionInssBenefitId> {
  inssBenefit: string;
  temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId;
}
