import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralOrHybridRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/value-object/rural-or-hybrid-retirement-rejection-work-period-id.value-object';
import type { RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document-analysis/value-object/rural-or-hybrid-retirement-rejection-work-period-document-analysis-id.value-object';

export interface RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisId> {
  documentType?: string | null;
  ownName?: string | null;
  documentYear?: number | null;
  technicalNote?: string | null;
  ruralOrHybridRetirementRejectionWorkPeriodId: RuralOrHybridRetirementRejectionWorkPeriodId;
}
