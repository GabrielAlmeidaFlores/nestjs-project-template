import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PerCapitaIncomeForBpcAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/per-capita-income-for-bpc-analysis-family-member.entity';
import type { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member-document/enum/per-capita-income-for-bpc-analysis-family-member-document-type.enum';
import type { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member-document/value-object/per-capita-income-for-bpc-analysis-family-member-document-id/per-capita-income-for-bpc-analysis-family-member-document-id.value-object';

export interface PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntityPropsInterface extends BaseEntityPropsInterface<PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentId> {
  document: string;
  type: PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeEnum;
  perCapitaIncomeForBpcAnalysisFamilyMember: PerCapitaIncomeForBpcAnalysisFamilyMemberEntity;
}
