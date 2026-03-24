import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AffiliateCustomerConfigConfigEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/enum/affiliate-customer-config-config.enum';
import type { AffiliateCustomerConfigId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/value-object/affiliate-customer-config-id/affiliate-customer-config-id.value-object';

export interface AffiliateCustomerConfigEntityPropsInterface extends BaseEntityPropsInterface<AffiliateCustomerConfigId> {
  config: AffiliateCustomerConfigConfigEnum;
  value: string;
}
