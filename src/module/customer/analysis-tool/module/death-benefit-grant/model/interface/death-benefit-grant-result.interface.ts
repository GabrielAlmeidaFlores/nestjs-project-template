import type { DeathBenefitGrantDependentQualityStatusEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/enum/death-benefit-grant-dependent-quality-status.enum';
import type { DeathBenefitGrantEligibilityStatusEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/enum/death-benefit-grant-eligibility-status.enum';
import type { DeathBenefitGrantInsuredQualityStatusEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/enum/death-benefit-grant-insured-quality-status.enum';

export interface DeathBenefitGrantResultApplicableRuleInterface {
  ruleName: string;
  result: string;
  rightDate: string | null;
  estimatedRmi: string | null;
  quotaQuantity: number | null;
  quotaValue: string | null;
  detailedAnalysis: string;
}

export interface DeathBenefitGrantResultDependentAnalysisInterface {
  dependentName: string;
  dependencyDegree: string;
  dependentQualityStatus: DeathBenefitGrantDependentQualityStatusEnum;
  quotaValue: string | null;
  pensionStartDate: string | null;
  estimatedPensionDuration: string;
}

export interface DeathBenefitGrantResultInterface {
  eligibilityStatus: DeathBenefitGrantEligibilityStatusEnum;
  insuredQualityStatus: DeathBenefitGrantInsuredQualityStatusEnum;
  dependentQualityStatus: DeathBenefitGrantDependentQualityStatusEnum;
  applicableRules: DeathBenefitGrantResultApplicableRuleInterface[];
  dependentAnalysis: DeathBenefitGrantResultDependentAnalysisInterface[];
  analysisDescription: string;
}

export function parseDeathBenefitGrantCompleteAnalysis(
  jsonString: string,
): DeathBenefitGrantResultInterface {
  let cleaned = jsonString.trim();

  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    cleaned = JSON.parse(cleaned) as string;
  }

  const parsed = JSON.parse(cleaned) as Record<string, unknown>;

  return parsed as unknown as DeathBenefitGrantResultInterface;
}
