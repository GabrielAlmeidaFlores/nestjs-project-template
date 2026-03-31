import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AffiliateCustomerConfigEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/affiliate-customer-config.entity';
import type { AffiliateCustomerConfigId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/value-object/affiliate-customer-config-id/affiliate-customer-config-id.value-object';

export abstract class AffiliateCustomerConfigCommandRepositoryGateway {
  public abstract createAffiliateCustomerConfig(
    props: AffiliateCustomerConfigEntity,
  ): TransactionType;

  public abstract updateAffiliateCustomerConfig(
    id: AffiliateCustomerConfigId,
    props: AffiliateCustomerConfigEntity,
  ): TransactionType;
}
