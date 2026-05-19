import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralOrHybridRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/value-object/rural-or-hybrid-retirement-analysis-work-period-id.value-object';
import type { RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document/enum/rural-or-hybrid-retirement-analysis-work-period-document-type.enum';
import type { RuralOrHybridRetirementAnalysisWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document/value-object/rural-or-hybrid-retirement-analysis-work-period-document-id.value-object';

export interface RuralOrHybridRetirementAnalysisWorkPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementAnalysisWorkPeriodDocumentId> {
  document?: string | null;
  type?: RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeEnum | null;
  ruralOrHybridRetirementAnalysisWorkPeriodId: RuralOrHybridRetirementAnalysisWorkPeriodId;
}
