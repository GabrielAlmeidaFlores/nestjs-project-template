import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import type { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import type { PerCapitaIncomeForBpcAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/per-capita-income-for-bpc-analysis-document.entity';
import type { PerCapitaIncomeForBpcAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/per-capita-income-for-bpc-analysis-family-member.entity';
import type { PerCapitaIncomeForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/per-capita-income-for-bpc-analysis-result.entity';

export interface PerCapitaIncomeForBpcAnalysisEntityPropsInterface extends BaseEntityPropsInterface<PerCapitaIncomeForBpcAnalysisId> {
  perCapitaIncomeForBpcAnalysisResult?: PerCapitaIncomeForBpcAnalysisResultEntity | null;
  perCapitaIncomeForBpcAnalysisFamilyMember?:
    | PerCapitaIncomeForBpcAnalysisFamilyMemberEntity[]
    | null;
  perCapitaIncomeForBpcAnalysisDocument?:
    | PerCapitaIncomeForBpcAnalysisDocumentEntity[]
    | null;
  analysisToolRecord?: AnalysisToolRecordEntity | null;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}
