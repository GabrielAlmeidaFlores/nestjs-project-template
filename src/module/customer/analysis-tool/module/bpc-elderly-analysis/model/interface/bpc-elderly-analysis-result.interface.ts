import type { BpcElderlyAnalysisCategoryEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/enum/bpc-elderly-analysis-category.enum';

export interface BpcElderlyAnalysisResultInterface {
  diagnosis: string;
  totalHouseholdIncome: number;
  perCapitaIncome: number;
  eligibilityJustification: string;
  type: string;
  benefitStartDate: string;
  amount: number;
  analysisDetails: string;
  category: BpcElderlyAnalysisCategoryEnum;
  legalRequirementsMet: string;
  perCapitaIncomeBelowQuarterMinimumWage: string;
  ageEqualOrAbove65Years: string;
  completeAnalysisDownload: string;
}
