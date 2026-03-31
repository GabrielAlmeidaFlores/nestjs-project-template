import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

export class GetSupportAttendantByAuthIdentityIdQueryResult extends BaseBuildableObject {
  public readonly name: string;
  public readonly supportType: SupportTypeEnum;

  protected override readonly _type =
    GetSupportAttendantByAuthIdentityIdQueryResult.name;
}
