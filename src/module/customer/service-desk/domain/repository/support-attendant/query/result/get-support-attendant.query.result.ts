import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';

export class GetSupportAttendantQueryResult extends BaseBuildableObject {
  public readonly id: SupportAttendantId;
  public readonly name: string;

  protected override readonly _type = GetSupportAttendantQueryResult.name;
}
