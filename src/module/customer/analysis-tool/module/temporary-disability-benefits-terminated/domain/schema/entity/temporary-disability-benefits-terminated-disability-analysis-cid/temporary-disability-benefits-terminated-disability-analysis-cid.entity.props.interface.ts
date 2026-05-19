import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/value-object/temporary-disability-benefits-terminated-disability-analysis-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-cid/value-object/temporary-disability-benefits-terminated-disability-analysis-cid-id.value-object';

export interface TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidId> {
  cidTenId: string;
  temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId;
}
