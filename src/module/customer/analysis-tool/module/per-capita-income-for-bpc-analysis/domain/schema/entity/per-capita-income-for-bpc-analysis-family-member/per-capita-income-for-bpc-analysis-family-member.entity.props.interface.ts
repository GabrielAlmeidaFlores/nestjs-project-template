import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import type { PerCapitaIncomeForBpcAnalysisFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/enum/per-capita-income-for-bpc-analysis-family-member-income-type.enum';
import type { PerCapitaIncomeForBpcAnalysisFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/enum/per-capita-income-for-bpc-analysis-family-member-kinship.enum';
import type { PerCapitaIncomeForBpcAnalysisFamilyMemberId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/value-object/per-capita-income-for-bpc-analysis-family-member-id/per-capita-income-for-bpc-analysis-family-member-id.value-object';

export interface PerCapitaIncomeForBpcAnalysisFamilyMemberEntityPropsInterface extends BaseEntityPropsInterface<PerCapitaIncomeForBpcAnalysisFamilyMemberId> {
  fullName: string;
  birthDate: Date;
  kinship: PerCapitaIncomeForBpcAnalysisFamilyMemberKinshipEnum;
  livesInSameResidence: boolean;
  hasIncome: boolean;
  monthlyIncomeAmount?: number | null;
  incomeType?: PerCapitaIncomeForBpcAnalysisFamilyMemberIncomeTypeEnum | null;
  perCapitaIncomeForBpcAnalysis: PerCapitaIncomeForBpcAnalysisEntity;
}
