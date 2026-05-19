import type { DeathBenefitGrantTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-recognition-inss.enum';
import type { DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-recognition-judicial.enum';
import type { DeathBenefitGrantTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-viability.enum';

export interface DeathBenefitGrantTimeAcceleratorAnalysisResultItemInterface {
  recognitionInss: DeathBenefitGrantTimeAcceleratorRecognitionInssEnum;
  recognitionJudicial: DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum;
  viability: DeathBenefitGrantTimeAcceleratorViabilityEnum;
  technicalNote: string | null;
  startDate: string | null;
  endDate: string | null;
  institution: string | null;
  affectsQualifyingPeriod: boolean;
}

export interface DeathBenefitGrantTimeAcceleratorAnalysisResultInterface {
  timeAccelerators: DeathBenefitGrantTimeAcceleratorAnalysisResultItemInterface[];
}
