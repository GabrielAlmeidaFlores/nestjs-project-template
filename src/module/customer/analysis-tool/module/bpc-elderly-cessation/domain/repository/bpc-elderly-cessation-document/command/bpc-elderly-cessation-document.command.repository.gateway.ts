import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcElderlyCessationDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/bpc-elderly-cessation-document.entity';

export abstract class BpcElderlyCessationDocumentCommandRepositoryGateway {
  public abstract createBpcElderlyCessationDocument(
    props: BpcElderlyCessationDocumentEntity,
  ): TransactionType;

  public abstract createManyBpcElderlyCessationDocument(
    props: BpcElderlyCessationDocumentEntity[],
  ): TransactionType[];
}
