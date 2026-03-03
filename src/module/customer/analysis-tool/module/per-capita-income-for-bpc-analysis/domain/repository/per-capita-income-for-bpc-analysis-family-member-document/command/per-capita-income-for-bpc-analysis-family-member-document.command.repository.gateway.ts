import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member-document/per-capita-income-for-bpc-analysis-family-member-document.entity';
import type { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member-document/value-object/per-capita-income-for-bpc-analysis-family-member-document-id/per-capita-income-for-bpc-analysis-family-member-document-id.value-object';

export abstract class PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentCommandRepositoryGateway {
  public abstract createPerCapitaIncomeForBpcAnalysisFamilyMemberDocument(
    props: PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntity,
  ): TransactionType;

  public abstract createManyPerCapitaIncomeForBpcAnalysisFamilyMemberDocument(
    props: PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntity[],
  ): TransactionType[];

  public abstract deletePerCapitaIncomeForBpcAnalysisFamilyMemberDocument(
    id: PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentId,
  ): TransactionType;
}
