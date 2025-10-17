import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CustomerTermsAcceptanceEntity } from '@module/customer/account/domain/schema/entity/customer-terms-acceptance/customer-terms-acceptance.entity';

export abstract class CustomerTermsAcceptanceCommandRepositoryGateway {
  public abstract createCustomerTermsAcceptance(
    props: CustomerTermsAcceptanceEntity,
  ): TransactionType;
}
