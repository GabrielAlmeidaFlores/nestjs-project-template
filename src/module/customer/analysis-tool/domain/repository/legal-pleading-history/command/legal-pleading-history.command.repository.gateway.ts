import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { LegalPleadingHistoryEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-history/legal-pleading-history.entity';
import type { LegalPleadingHistoryId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-history/value-object/legal-pleading-history-id/legal-pleading-history-id.value-object';

export abstract class LegalPleadingHistoryCommandRepositoryGateway {
  public abstract createLegalPleadingHistory(
    entity: LegalPleadingHistoryEntity,
  ): TransactionType;

  public abstract updateLegalPleadingHistory(
    id: LegalPleadingHistoryId,
    entity: LegalPleadingHistoryEntity,
  ): TransactionType;

  public abstract deleteLegalPleadingHistory(
    id: LegalPleadingHistoryId,
  ): TransactionType;
}
