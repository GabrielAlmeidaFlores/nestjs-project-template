import type { RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-time-accelerator-analysis-type.enum';
import type { RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-time-accelerator-recognition-inss.enum';
import type { RuralOrHybridRetirementRejectionViabilityEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-viability.enum';

export interface RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisResultItemInterface {
  timeType: RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum;
  recognitionInss: RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum;
  viability: RuralOrHybridRetirementRejectionViabilityEnum;
  technicalNote: string | null;
  startDate: string | null;
  endDate: string | null;
  gracePeriod: string | null;
  institution: string | null;
  affectsQualifyingPeriod: boolean;
}

export interface RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisResultInterface {
  timeAccelerators: RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisResultItemInterface[];
}
