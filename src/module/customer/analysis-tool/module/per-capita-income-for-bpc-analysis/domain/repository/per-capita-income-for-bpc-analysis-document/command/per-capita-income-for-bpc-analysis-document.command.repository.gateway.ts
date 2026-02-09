import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PerCapitaIncomeForBpcAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/per-capita-income-for-bpc-analysis-document.entity';
import type { PerCapitaIncomeForBpcAnalysisDocumentId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/value-object/per-capita-income-for-bpc-analysis-document-id/per-capita-income-for-bpc-analysis-document-id.value-object';

export abstract class PerCapitaIncomeForBpcAnalysisDocumentCommandRepositoryGateway {
  public abstract createPerCapitaIncomeForBpcAnalysisDocument(
    props: PerCapitaIncomeForBpcAnalysisDocumentEntity,
  ): TransactionType;

  public abstract createManyPerCapitaIncomeForBpcAnalysisDocument(
    props: PerCapitaIncomeForBpcAnalysisDocumentEntity[],
  ): TransactionType[];

  public abstract deletePerCapitaIncomeForBpcAnalysisDocument(
    id: PerCapitaIncomeForBpcAnalysisDocumentId,
  ): TransactionType;
}
