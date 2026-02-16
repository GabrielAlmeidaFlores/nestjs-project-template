import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { LegalPleadingDocumentEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-document/legal-pleading-document.entity';
import type { LegalPleadingDocumentId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-document/value-object/legal-pleading-document/legal-pleading-document-id.value-object';

export abstract class LegalPleadingDocumentCommandRepositoryGateway {
  public abstract createLegalPleadingDocument(
    props: LegalPleadingDocumentEntity,
  ): TransactionType;

  public abstract updateLegalPleadingDocument(
    id: LegalPleadingDocumentId,
    props: LegalPleadingDocumentEntity,
  ): TransactionType;
}
