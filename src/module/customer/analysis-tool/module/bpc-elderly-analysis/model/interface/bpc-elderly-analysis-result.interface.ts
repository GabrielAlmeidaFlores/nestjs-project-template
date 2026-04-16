import { BpcElderlyAnalysisResultCategoryEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-result/enum/bpc-elderly-analysis-result-category.enum';

export interface BpcElderlyAnalysisResultInterface {
  diagnosis: string;
  totalHouseholdIncome: number;
  perCapitaIncome: number;
  eligibilityJustification: string;
  type: string;
  benefitStartDate: string;
  amount: number;
  analysisDetails: string;
  category: BpcElderlyAnalysisResultCategoryEnum;
}
