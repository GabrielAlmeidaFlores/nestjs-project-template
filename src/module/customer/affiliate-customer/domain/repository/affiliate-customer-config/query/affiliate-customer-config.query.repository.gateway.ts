import type { AffiliateCustomerConfigEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/affiliate-customer-config.entity';
import type { AffiliateCustomerConfigConfigEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/enum/affiliate-customer-config-config.enum';

export abstract class AffiliateCustomerConfigQueryRepositoryGateway {
  public abstract findOneByConfig(
    config: AffiliateCustomerConfigConfigEnum,
  ): Promise<AffiliateCustomerConfigEntity | null>;

  public abstract findAll(): Promise<AffiliateCustomerConfigEntity[]>;
}
