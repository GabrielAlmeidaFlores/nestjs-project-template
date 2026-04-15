import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

import type { RuralOrHybridRetirementRejectionResultId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-result/value-object/rural-or-hybrid-retirement-rejection-result-id.value-object';
import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';

export interface RuralOrHybridRetirementRejectionResultEntityPropsInterface
  extends BaseEntityPropsInterface<RuralOrHybridRetirementRejectionResultId> {
  firstAnalysis?: string | null;
  secondAnalysis?: string | null;
  completeAnalysis?: string | null;
  simplifiedAnalysis?: string | null;
  completeAnalysisDownload?: string | null;
  simplifiedAnalysisDownload?: string | null;
  ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;
}
