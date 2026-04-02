import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AffiliateCustomerEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/affiliate-customer.entity';
import type { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';

export abstract class AffiliateCustomerCommandRepositoryGateway {
  public abstract createAffiliateCustomer(
    props: AffiliateCustomerEntity,
  ): TransactionType;

  public abstract updateAffiliateCustomer(
    id: AffiliateCustomerId,
    props: AffiliateCustomerEntity,
  ): TransactionType;

  public abstract deleteAffiliateCustomer(
    id: AffiliateCustomerId,
  ): TransactionType;
}
