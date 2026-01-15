import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialActivityDocumentEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-document/special-activity-document.entity';
import type { SpecialActivityDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-document/value-object/special-activity-document-id.value-object';

export abstract class SpecialActivityDocumentCommandRepositoryGateway {
  public abstract createSpecialActivityDocument(
    props: SpecialActivityDocumentEntity,
  ): TransactionType;

  public abstract deleteSpecialActivityDocument(
    id: SpecialActivityDocumentId,
  ): TransactionType;
}
