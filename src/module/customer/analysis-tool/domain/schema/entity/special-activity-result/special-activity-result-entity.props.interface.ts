import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialActivityResultId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-result/value-object/special-activity-result-id.value-object';

export interface SpecialActivityResultEntityPropsInterface extends BaseEntityPropsInterface<SpecialActivityResultId> {
  specialActivityCompleteAnalysis?: string | null;
  specialActivitySimplifiedAnalysis?: string | null;
  specialActivityCompleteAnalysisDownload?: string | null;
}
