import type { GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-recognition-inss.enum';
import type { GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-recognition-judicial.enum';
import type { GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-viability.enum';

export interface GeneralUrbanRetirementDenialTimeAcceleratorAnalysisResultItemInterface {
  recognitionInss: GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum;
  recognitionJudicial: GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum;
  viability: GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum;
  technicalNote: string | null;
  startDate: string | null;
  endDate: string | null;
  institution: string | null;
  affectsQualifyingPeriod: boolean;
}

export interface GeneralUrbanRetirementDenialTimeAcceleratorAnalysisResultInterface {
  timeAccelerators: GeneralUrbanRetirementDenialTimeAcceleratorAnalysisResultItemInterface[];
}
