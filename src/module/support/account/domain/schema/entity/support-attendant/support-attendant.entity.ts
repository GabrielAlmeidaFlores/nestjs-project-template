import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';

import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { SupportAttendantEntityPropsInterface } from '@module/support/account/domain/schema/entity/support-attendant/support-attendant.entity.props.interface';
import type { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

export class SupportAttendantEntity extends BaseEntity<SupportAttendantId> {
  public readonly name: string;
  public readonly email: string;
  public readonly supportType: SupportTypeEnum;
  public readonly isActive: boolean;
  public readonly authIdentityId: AuthIdentityId | null;

  protected readonly _type = SupportAttendantEntity.name;

  public constructor(props: SupportAttendantEntityPropsInterface) {
    super(SupportAttendantId, props);

    this.name = props.name;
    this.email = props.email;
    this.supportType = props.supportType;
    this.isActive = props.isActive;
    this.authIdentityId = props.authIdentityId ?? null;
  }
}
