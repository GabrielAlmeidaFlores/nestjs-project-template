import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CustomerTermsEntity } from '@module/customer/account/domain/schema/entity/customer-terms/customer-terms.entity';
import type { CustomerTermsId } from '@module/customer/account/domain/schema/entity/customer-terms/value-object/customer-terms-id/customer-terms-id.value-object';

export abstract class CustomerTermsCommandRepositoryGateway {
  public abstract createCustomerTerms(
    props: CustomerTermsEntity,
  ): TransactionType;

  public abstract updateCustomerTerms(
    id: CustomerTermsId,
    props: CustomerTermsEntity,
  ): TransactionType;
}
