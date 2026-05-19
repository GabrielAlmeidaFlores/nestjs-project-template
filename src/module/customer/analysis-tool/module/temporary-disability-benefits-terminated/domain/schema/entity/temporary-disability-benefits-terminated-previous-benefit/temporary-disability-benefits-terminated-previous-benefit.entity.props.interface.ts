import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/value-object/temporary-disability-benefits-terminated-disability-analysis-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedPreviousBenefitId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit/value-object/temporary-disability-benefits-terminated-previous-benefit-id.value-object';

export interface TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsTerminatedPreviousBenefitId> {
  benefitNumber: string;
  temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId;
}
