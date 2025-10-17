import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CustomerTermsEntity } from '@module/customer/account/domain/schema/entity/customer-terms/customer-terms.entity';

export abstract class CustomerTermsCommandRepositoryGateway {
  public abstract createCustomerTerms(
    props: CustomerTermsEntity,
  ): TransactionType;
}
