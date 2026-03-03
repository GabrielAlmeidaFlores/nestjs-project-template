import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { LegalPleadingAddressEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-address/legal-pleading-address.entity';

export abstract class LegalPleadingAddressCommandRepositoryGateway {
  public abstract createLegalPleadingAddress(
    props: LegalPleadingAddressEntity,
  ): TransactionType;
}
