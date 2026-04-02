import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { RegulatoryUpdateEmailPreferenceId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-email-preference/value-object/regulatory-update-email-preference-id/regulatory-update-email-preference-id.value-object';

export class GetRegulatoryUpdateEmailPreferenceQueryResult extends BaseBuildableObject {
  public readonly id: RegulatoryUpdateEmailPreferenceId;
  public readonly customerId: CustomerId;
  public readonly emailEnabled: boolean;
  public readonly customerEmail: string;

  protected override readonly _type =
    GetRegulatoryUpdateEmailPreferenceQueryResult.name;
}
