import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CustomerTermsId } from '@module/customer/account/domain/schema/entity/customer-terms/value-object/customer-terms-id/customer-terms-id.value-object';

export interface CustomerTermsEntityPropsInterface
  extends BaseEntityPropsInterface<CustomerTermsId> {
  content: string;
  isActive: boolean;
}
