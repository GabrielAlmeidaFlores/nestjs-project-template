import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityDenialDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/bpc-disability-denial-document.entity';

export abstract class BpcDisabilityDenialDocumentCommandRepositoryGateway {
  public abstract createBpcDisabilityDenialDocument(
    props: BpcDisabilityDenialDocumentEntity,
  ): TransactionType;

  public abstract createManyBpcDisabilityDenialDocument(
    props: BpcDisabilityDenialDocumentEntity[],
  ): TransactionType[];
}
