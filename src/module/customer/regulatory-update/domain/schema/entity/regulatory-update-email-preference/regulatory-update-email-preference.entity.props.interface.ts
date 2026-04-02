import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { RegulatoryUpdateEmailPreferenceId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-email-preference/value-object/regulatory-update-email-preference-id/regulatory-update-email-preference-id.value-object';

export interface RegulatoryUpdateEmailPreferenceEntityPropsInterface extends BaseEntityPropsInterface<RegulatoryUpdateEmailPreferenceId> {
  customerId: CustomerId;
  emailEnabled: boolean;
}
