import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RegulatoryUpdateEmailPreferenceId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-email-preference/value-object/regulatory-update-email-preference-id/regulatory-update-email-preference-id.value-object';

import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { RegulatoryUpdateEmailPreferenceEntityPropsInterface } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-email-preference/regulatory-update-email-preference.entity.props.interface';

export class RegulatoryUpdateEmailPreferenceEntity extends BaseEntity<RegulatoryUpdateEmailPreferenceId> {
  public readonly customerId: CustomerId;
  public readonly emailEnabled: boolean;

  protected readonly _type = RegulatoryUpdateEmailPreferenceEntity.name;

  public constructor(
    props: RegulatoryUpdateEmailPreferenceEntityPropsInterface,
  ) {
    super(RegulatoryUpdateEmailPreferenceId, props);
    this.customerId = props.customerId;
    this.emailEnabled = props.emailEnabled;
  }
}
