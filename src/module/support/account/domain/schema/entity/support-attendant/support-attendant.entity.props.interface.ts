import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import type { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

export interface SupportAttendantEntityPropsInterface extends BaseEntityPropsInterface<SupportAttendantId> {
  name: string;
  email: string;
  supportType: SupportTypeEnum;
  isActive: boolean;
  authIdentityId?: AuthIdentityId | null;
}
