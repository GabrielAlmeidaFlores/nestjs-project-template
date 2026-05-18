import type { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-inss.enum';
import type { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-judicial.enum';
import type { DisabilityRetirementPlanningGrantViabilityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-viability.enum';

export interface DisabilityRetirementPlanningGrantTimeAcceleratorAnalysisResultItemInterface {
  recognitionInss: DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum;
  recognitionJudicial: DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum;
  viability: DisabilityRetirementPlanningGrantViabilityEnum;
  technicalNote: string | null;
  startDate: string | null;
  endDate: string | null;
  institution: string | null;
  affectsQualifyingPeriod: boolean;
}

export interface DisabilityRetirementPlanningGrantTimeAcceleratorAnalysisResultInterface {
  timeAccelerators: DisabilityRetirementPlanningGrantTimeAcceleratorAnalysisResultItemInterface[];
}
