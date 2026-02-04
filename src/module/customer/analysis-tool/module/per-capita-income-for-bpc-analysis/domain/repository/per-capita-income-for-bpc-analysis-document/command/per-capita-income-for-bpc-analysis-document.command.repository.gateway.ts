import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PerCapitaIncomeForBpcAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/per-capita-income-for-bpc-analysis-document.entity';

export abstract class PerCapitaIncomeForBpcAnalysisDocumentCommandRepositoryGateway {
  public abstract createPerCapitaIncomeForBpcAnalysisDocument(
    props: PerCapitaIncomeForBpcAnalysisDocumentEntity,
  ): TransactionType;

  public abstract createManyPerCapitaIncomeForBpcAnalysisDocument(
    props: PerCapitaIncomeForBpcAnalysisDocumentEntity[],
  ): TransactionType[];
}
