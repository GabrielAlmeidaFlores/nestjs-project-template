import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CustomerTermsAcceptanceId } from '@module/customer/account/domain/schema/entity/customer-terms-acceptance/value-object/organization-member-id/customer-terms-acceptance-id.value-object';
import type { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import type { TermsEntity } from '@module/customer/account/domain/schema/entity/terms/terms.entity';

export interface CustomerTermsAcceptanceEntityPropsInterface
  extends BaseEntityPropsInterface<CustomerTermsAcceptanceId> {
  customer: CustomerEntity;
  terms: TermsEntity;
}
