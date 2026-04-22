import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcElderlyAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/bpc-elderly-analysis-document.entity';

export abstract class BpcElderlyAnalysisDocumentCommandRepositoryGateway {
  public abstract createBpcElderlyAnalysisDocument(
    props: BpcElderlyAnalysisDocumentEntity,
  ): TransactionType;

  public abstract createManyBpcElderlyAnalysisDocument(
    props: BpcElderlyAnalysisDocumentEntity[],
  ): TransactionType[];
}
