import type { MaternityPayGrantEligibilityStatusEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/enum/maternity-pay-grant-eligibility-status.enum';
import type { MaternityPayGrantInsuredQualityStatusEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/enum/maternity-pay-grant-insured-quality-status.enum';

export interface MaternityPayGrantResultApplicableRuleInterface {
  ruleName: string;
  result: string;
  estimatedBenefit: string | null;
  detailedAnalysis: string;
}

export interface MaternityPayGrantResultInterface {
  eligibilityStatus: MaternityPayGrantEligibilityStatusEnum;
  insuredQualityStatus: MaternityPayGrantInsuredQualityStatusEnum;
  applicableRules: MaternityPayGrantResultApplicableRuleInterface[];
  analysisDescription: string;
  completeAnalysisDownload: string;
}
