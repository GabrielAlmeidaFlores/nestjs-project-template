import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralOrHybridRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/value-object/rural-or-hybrid-retirement-analysis-work-period-id.value-object';
import type { RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document-analysis/value-object/rural-or-hybrid-retirement-analysis-work-period-document-analysis-id.value-object';

export interface RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisId> {
  documentType?: string | null;
  ownName?: string | null;
  documentYear?: number | null;
  technicalNote?: string | null;
  ruralOrHybridRetirementAnalysisWorkPeriodId: RuralOrHybridRetirementAnalysisWorkPeriodId;
}
