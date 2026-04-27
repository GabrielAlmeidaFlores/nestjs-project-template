import type { TimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/domain/schema/enum/time-accelerator-analysis-type.enum';
import type { TimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/domain/schema/enum/time-accelerator-recognition-inss.enum';
import type { TimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/domain/schema/enum/time-accelerator-viability.enum';

export interface RuralOrHybridRetirementAnalysisTimeAcceleratorAnalysisResultItemInterface {
  timeType: TimeAcceleratorAnalysisTypeEnum;
  recognitionInss: TimeAcceleratorRecognitionInssEnum;
  viability: TimeAcceleratorViabilityEnum;
  technicalNote: string | null;
  startDate: string | null;
  endDate: string | null;
  gracePeriod: string | null;
  institution: string | null;
  affectsQualifyingPeriod: boolean;
}

export interface RuralOrHybridRetirementAnalysisTimeAcceleratorAnalysisResultInterface {
  timeAccelerators: RuralOrHybridRetirementAnalysisTimeAcceleratorAnalysisResultItemInterface[];
}
