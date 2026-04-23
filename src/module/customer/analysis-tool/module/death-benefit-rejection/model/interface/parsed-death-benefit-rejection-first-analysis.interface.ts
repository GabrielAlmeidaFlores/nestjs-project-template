import type { DeathBenefitRejectionFirstAnalysisModel } from '@module/customer/analysis-tool/module/death-benefit-rejection/model/generic/death-benefit-rejection-first-analysis.model';

export interface ParsedDeathBenefitRejectionFirstAnalysisInterface {
  cleanedJson: string;
  model: DeathBenefitRejectionFirstAnalysisModel;
}
