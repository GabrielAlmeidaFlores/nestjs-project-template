import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { LegalPleadingResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-result/legal-pleading.entity';

export abstract class LegalPleadingResultCommandRepositoryGateway {
  public abstract createLegalPleadingResult(
    props: LegalPleadingResultEntity,
  ): TransactionType;
}
