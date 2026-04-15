import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

import type { RuralOrHybridRetirementRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/value-object/rural-or-hybrid-retirement-rejection-time-accelerator-id.value-object';
import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import type { RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-time-accelerator-recognition-inss.enum';
import type { RuralOrHybridRetirementRejectionViabilityEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-viability.enum';
import type { RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-time-accelerator-analysis-type.enum';

export interface RuralOrHybridRetirementRejectionTimeAcceleratorEntityPropsInterface
  extends BaseEntityPropsInterface<RuralOrHybridRetirementRejectionTimeAcceleratorId> {
  timeType?: RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum | null;
  institution?: string | null;
  recognitionInss?: RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum | null;
  affectsQualifyingPeriod?: boolean | null;
  technicalNote?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  gracePeriod?: string | null;
  viability?: RuralOrHybridRetirementRejectionViabilityEnum | null;
  ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;
}
