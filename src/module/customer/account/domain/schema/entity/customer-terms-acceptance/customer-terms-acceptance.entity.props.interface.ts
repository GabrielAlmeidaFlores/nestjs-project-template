import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import type { CustomerTermsEntity } from '@module/customer/account/domain/schema/entity/customer-terms/customer-terms.entity';
import type { CustomerTermsAcceptanceId } from '@module/customer/account/domain/schema/entity/customer-terms-acceptance/value-object/organization-member-id/customer-terms-acceptance-id.value-object';

export interface CustomerTermsAcceptanceEntityPropsInterface extends BaseEntityPropsInterface<CustomerTermsAcceptanceId> {
  customer: CustomerEntity;
  customerTerms: CustomerTermsEntity;
}
