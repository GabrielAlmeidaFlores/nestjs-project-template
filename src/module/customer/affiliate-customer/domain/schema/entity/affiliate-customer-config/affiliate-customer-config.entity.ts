import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AffiliateCustomerConfigId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/value-object/affiliate-customer-config-id/affiliate-customer-config-id.value-object';

import type { AffiliateCustomerConfigEntityPropsInterface } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/affiliate-customer-config.entity.props.interface';
import type { AffiliateCustomerConfigConfigEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/enum/affiliate-customer-config-config.enum';

export class AffiliateCustomerConfigEntity extends BaseEntity<AffiliateCustomerConfigId> {
  public readonly config: AffiliateCustomerConfigConfigEnum;
  public readonly value: string;

  protected readonly _type = AffiliateCustomerConfigEntity.name;

  public constructor(props: AffiliateCustomerConfigEntityPropsInterface) {
    super(AffiliateCustomerConfigId, props);
    this.config = props.config;
    this.value = props.value;
  }
}
