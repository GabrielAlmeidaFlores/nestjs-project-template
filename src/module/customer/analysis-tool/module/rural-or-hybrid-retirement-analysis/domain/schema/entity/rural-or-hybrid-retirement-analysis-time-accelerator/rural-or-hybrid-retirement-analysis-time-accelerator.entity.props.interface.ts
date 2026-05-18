import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import type { RuralOrHybridRetirementAnalysisTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/enum/rural-or-hybrid-retirement-analysis-time-accelerator-analysis-type.enum';
import type { RuralOrHybridRetirementAnalysisTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/enum/rural-or-hybrid-retirement-analysis-time-accelerator-recognition-inss.enum';
import type { RuralOrHybridRetirementAnalysisViabilityEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/enum/rural-or-hybrid-retirement-analysis-viability.enum';
import type { RuralOrHybridRetirementAnalysisTimeAcceleratorId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/value-object/rural-or-hybrid-retirement-analysis-time-accelerator-id.value-object';

export interface RuralOrHybridRetirementAnalysisTimeAcceleratorEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementAnalysisTimeAcceleratorId> {
  timeType?: RuralOrHybridRetirementAnalysisTimeAcceleratorAnalysisTypeEnum | null;
  institution?: string | null;
  recognitionInss?: RuralOrHybridRetirementAnalysisTimeAcceleratorRecognitionInssEnum | null;
  affectsQualifyingPeriod?: boolean | null;
  technicalNote?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  gracePeriod?: string | null;
  viability?: RuralOrHybridRetirementAnalysisViabilityEnum | null;
  ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId;
}
