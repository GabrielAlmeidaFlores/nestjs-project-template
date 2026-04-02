import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import type { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

export class GetSupportAttendantByAuthIdentityIdQueryResult extends BaseBuildableObject {
  public readonly id: SupportAttendantId;
  public readonly name: string;
  public readonly supportType: SupportTypeEnum;

  protected override readonly _type =
    GetSupportAttendantByAuthIdentityIdQueryResult.name;
}
