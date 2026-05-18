import type { GeneralUrbanRetirementReviewTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/enum/general-urban-retirement-review-time-accelerator-recognition-inss.enum';
import type { GeneralUrbanRetirementReviewTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/enum/general-urban-retirement-review-time-accelerator-recognition-judicial.enum';
import type { GeneralUrbanRetirementReviewTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/enum/general-urban-retirement-review-time-accelerator-viability.enum';

export interface GeneralUrbanRetirementReviewTimeAcceleratorAnalysisResultItemInterface {
  recognitionInss: GeneralUrbanRetirementReviewTimeAcceleratorRecognitionInssEnum;
  recognitionJudicial: GeneralUrbanRetirementReviewTimeAcceleratorRecognitionJudicialEnum;
  viability: GeneralUrbanRetirementReviewTimeAcceleratorViabilityEnum;
  technicalNote: string | null;
  startDate: string | null;
  endDate: string | null;
  institution: string | null;
  affectsQualifyingPeriod: boolean;
}

export interface GeneralUrbanRetirementReviewTimeAcceleratorAnalysisResultInterface {
  timeAccelerators: GeneralUrbanRetirementReviewTimeAcceleratorAnalysisResultItemInterface[];
}
