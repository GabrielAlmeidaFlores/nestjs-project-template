import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import type { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';

export class GetSupportAttendantListItemQueryResult extends BaseBuildableObject {
  public readonly id: SupportAttendantId;
  public readonly name: string;
  public readonly email: string;
  public readonly supportType: SupportTypeEnum;
  public readonly isActive: boolean;
  public readonly totalAttendances: number;
  public readonly createdAt: Date;

  protected override readonly _type =
    GetSupportAttendantListItemQueryResult.name;
}
