import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import type { RuralOrHybridRetirementAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-document/enum/rural-or-hybrid-retirement-analysis-document-type.enum';
import type { RuralOrHybridRetirementAnalysisDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-document/value-object/rural-or-hybrid-retirement-analysis-document-id.value-object';

export interface RuralOrHybridRetirementAnalysisDocumentEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementAnalysisDocumentId> {
  document?: string | null;
  type?: RuralOrHybridRetirementAnalysisDocumentTypeEnum | null;
  ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId;
}
