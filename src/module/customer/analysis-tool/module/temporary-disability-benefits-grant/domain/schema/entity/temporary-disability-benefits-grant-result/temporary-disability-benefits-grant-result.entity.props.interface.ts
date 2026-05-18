import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsGrantResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-result/value-object/temporary-disability-benefits-grant-result-id.value-object';

export interface TemporaryDisabilityBenefitsGrantResultEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsGrantResultId> {
  completeAnalysis?: string | null;
  simplifiedAnalysis?: string | null;
  firstAnalysis?: string | null;
  completeAnalysisDownload?: string | null;
}
