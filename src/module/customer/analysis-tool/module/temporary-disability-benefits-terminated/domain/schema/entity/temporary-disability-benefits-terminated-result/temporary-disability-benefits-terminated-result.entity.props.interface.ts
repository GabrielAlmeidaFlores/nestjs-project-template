import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsTerminatedResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-result/value-object/temporary-disability-benefits-terminated-result-id.value-object';

export interface TemporaryDisabilityBenefitsTerminatedResultEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsTerminatedResultId> {
  inssDecisionAnalysis?: string | null;
  firstAnalysis?: string | null;
  completeAnalysis?: string | null;
  completeAnalysisDownload?: string | null;
  simplifiedAnalysis?: string | null;
}
