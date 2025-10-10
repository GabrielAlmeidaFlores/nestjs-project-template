import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { LegalPleadingResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-result/legal-pleading.entity';
import type { LegalPleadingResultId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-result/value-object/legal-pleading-result-id/legal-pleading-result-id.value-object';

export abstract class LegalPleadingResultCommandRepositoryGateway {
  public abstract createLegalPleadingResult(
    props: LegalPleadingResultEntity,
  ): TransactionType;

  public abstract updateLegalPleadingResult(
    id: LegalPleadingResultId,
    props: LegalPleadingResultEntity,
  ): TransactionType;
}
