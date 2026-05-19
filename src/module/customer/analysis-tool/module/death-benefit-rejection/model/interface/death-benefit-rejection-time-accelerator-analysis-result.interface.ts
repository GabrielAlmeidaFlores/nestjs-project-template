import type { DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-recognition-inss.enum';
import type { DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-recognition-judicial.enum';
import type { DeathBenefitRejectionTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-viability.enum';

export interface DeathBenefitRejectionTimeAcceleratorAnalysisResultItemInterface {
  recognitionInss: DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum;
  recognitionJudicial: DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum;
  viability: DeathBenefitRejectionTimeAcceleratorViabilityEnum;
  technicalNote: string | null;
  startDate: string | null;
  endDate: string | null;
  institution: string | null;
  affectsQualifyingPeriod: boolean;
}

export interface DeathBenefitRejectionTimeAcceleratorAnalysisResultInterface {
  timeAccelerators: DeathBenefitRejectionTimeAcceleratorAnalysisResultItemInterface[];
}
