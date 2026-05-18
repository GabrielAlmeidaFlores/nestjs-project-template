import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcElderlyAnalysisEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/bpc-elderly-analysis.entity';
import type { BpcElderlyAnalysisFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/enum/bpc-elderly-analysis-family-member-income-type.enum';
import type { BpcElderlyAnalysisFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/enum/bpc-elderly-analysis-family-member-kinship.enum';
import type { BpcElderlyAnalysisFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/value-object/bpc-elderly-analysis-family-member-id/bpc-elderly-analysis-family-member-id.value-object';
import type { BpcElderlyAnalysisFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/bpc-elderly-analysis-family-member-document.entity';

export interface BpcElderlyAnalysisFamilyMemberEntityPropsInterface extends BaseEntityPropsInterface<BpcElderlyAnalysisFamilyMemberId> {
  fullName: string;
  birthDate: Date;
  kinship: BpcElderlyAnalysisFamilyMemberKinshipEnum;
  livesInSameResidence: boolean;
  hasIncome: boolean;
  monthlyIncomeAmount?: number | null;
  incomeType?: BpcElderlyAnalysisFamilyMemberIncomeTypeEnum | null;
  bpcElderlyAnalysis: BpcElderlyAnalysisEntity;
  bpcElderlyAnalysisFamilyMemberDocument?:
    | BpcElderlyAnalysisFamilyMemberDocumentEntity[]
    | null;
}
