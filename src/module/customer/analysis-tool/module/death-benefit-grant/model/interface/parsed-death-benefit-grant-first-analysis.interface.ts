import type { DeathBenefitGrantFirstAnalysisModel } from '@module/customer/analysis-tool/module/death-benefit-grant/model/generic/death-benefit-grant-first-analysis.model';

export interface ParsedDeathBenefitGrantFirstAnalysisInterface {
  cleanedJson: string;
  model: DeathBenefitGrantFirstAnalysisModel;
}
