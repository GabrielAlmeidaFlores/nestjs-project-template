import type { DeathBenefitRejectionDependentQualityStatusEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/enum/death-benefit-rejection-dependent-quality-status.enum';
import type { DeathBenefitRejectionEligibilityStatusEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/enum/death-benefit-rejection-eligibility-status.enum';
import type { DeathBenefitRejectionInsuredQualityStatusEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/enum/death-benefit-rejection-insured-quality-status.enum';

export interface DeathBenefitRejectionResultApplicableRuleInterface {
  ruleName: string;
  result: string;
  rightDate: string | null;
  estimatedRmi: string | null;
  quotaQuantity: number | null;
  quotaValue: string | null;
  detailedAnalysis: string;
}

export interface DeathBenefitRejectionResultDependentAnalysisInterface {
  dependentName: string;
  dependencyDegree: string;
  dependentQualityStatus: DeathBenefitRejectionDependentQualityStatusEnum;
  quotaValue: string | null;
  pensionStartDate: string | null;
  estimatedPensionDuration: string;
}

export interface DeathBenefitRejectionResultInterface {
  eligibilityStatus: DeathBenefitRejectionEligibilityStatusEnum;
  insuredQualityStatus: DeathBenefitRejectionInsuredQualityStatusEnum;
  dependentQualityStatus: DeathBenefitRejectionDependentQualityStatusEnum;
  applicableRules: DeathBenefitRejectionResultApplicableRuleInterface[];
  dependentAnalysis: DeathBenefitRejectionResultDependentAnalysisInterface[];
  analysisDescription: string;
}

export function parseDeathBenefitRejectionCompleteAnalysis(
  jsonString: string,
): DeathBenefitRejectionResultInterface {
  let cleaned = jsonString.trim();

  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    cleaned = JSON.parse(cleaned) as string;
  }

  const parsed = JSON.parse(cleaned) as Record<string, unknown>;

  return parsed as unknown as DeathBenefitRejectionResultInterface;
}
