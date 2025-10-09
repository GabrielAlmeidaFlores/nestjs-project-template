import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { LegalPleadingEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/legal-pleading.entity';

export abstract class LegalPleadingCommandRepositoryGateway {
  public abstract createLegalPleading(
    props: LegalPleadingEntity,
  ): TransactionType;
}
