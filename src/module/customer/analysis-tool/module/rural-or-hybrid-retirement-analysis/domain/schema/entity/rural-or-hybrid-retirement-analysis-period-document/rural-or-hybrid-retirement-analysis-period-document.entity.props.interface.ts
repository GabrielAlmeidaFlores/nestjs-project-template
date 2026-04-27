import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralOrHybridRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/value-object/rural-or-hybrid-retirement-analysis-period-id.value-object';
import type { RuralOrHybridRetirementAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-document/enum/rural-or-hybrid-retirement-analysis-period-document-type.enum';
import type { RuralOrHybridRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-document/value-object/rural-or-hybrid-retirement-analysis-period-document-id.value-object';

export interface RuralOrHybridRetirementAnalysisPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementAnalysisPeriodDocumentId> {
  document?: string | null;
  type?: RuralOrHybridRetirementAnalysisPeriodDocumentTypeEnum | null;
  ruralOrHybridRetirementAnalysisPeriodId: RuralOrHybridRetirementAnalysisPeriodId;
}
