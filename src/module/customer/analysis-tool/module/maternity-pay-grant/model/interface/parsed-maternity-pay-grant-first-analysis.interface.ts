import type { MaternityPayGrantFirstAnalysisModel } from '@module/customer/analysis-tool/module/maternity-pay-grant/model/generic/maternity-pay-grant-first-analysis.model';

export interface ParsedMaternityPayGrantFirstAnalysisInterface {
  cleanedJson: string;
  model: MaternityPayGrantFirstAnalysisModel;
}
