import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { LegalPleadingDocumentEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/legal-pleading-document.entity';

export abstract class LegalPleadingDocumentCommandRepositoryGateway {
  public abstract createLegalPleadingDocument(
    props: LegalPleadingDocumentEntity,
  ): TransactionType;
}
