import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedInssBenefitId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-inss-benefit/value-object/temporary-disability-benefits-terminated-inss-benefit-id.value-object';

export interface TemporaryDisabilityBenefitsTerminatedInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsTerminatedInssBenefitId> {
  inssBenefit: string;
  temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId;
}
