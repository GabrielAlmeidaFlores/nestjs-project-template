import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import type { TemporaryIncapacityBenefitTerminationInssBenefitId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-inss-benefit/value-object/temporary-incapacity-benefit-termination-inss-benefit-id.value-object';

export interface TemporaryIncapacityBenefitTerminationInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitTerminationInssBenefitId> {
  inssBenefit: string;
  temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId;
}
