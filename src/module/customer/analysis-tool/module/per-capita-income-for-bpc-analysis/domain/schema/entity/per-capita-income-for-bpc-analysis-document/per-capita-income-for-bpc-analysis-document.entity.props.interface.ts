import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import type { PerCapitaIncomeForBpcAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/enum/per-capita-income-for-bpc-analysis-document-type.enum';
import type { PerCapitaIncomeForBpcAnalysisDocumentId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/value-object/per-capita-income-for-bpc-analysis-document-id/per-capita-income-for-bpc-analysis-document-id.value-object';

export interface PerCapitaIncomeForBpcAnalysisDocumentEntityPropsInterface extends BaseEntityPropsInterface<PerCapitaIncomeForBpcAnalysisDocumentId> {
  document: string;
  type: PerCapitaIncomeForBpcAnalysisDocumentTypeEnum;
  perCapitaIncomeForBpcAnalysis: PerCapitaIncomeForBpcAnalysisEntity;
}
