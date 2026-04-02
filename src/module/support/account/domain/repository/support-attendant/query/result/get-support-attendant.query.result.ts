import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import type { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

export class GetSupportAttendantQueryResult extends BaseBuildableObject {
  public readonly id: SupportAttendantId;
  public readonly name: string;
  public readonly email: Email;
  public readonly supportType: SupportTypeEnum;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type = GetSupportAttendantQueryResult.name;
}
