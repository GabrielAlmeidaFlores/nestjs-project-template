import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { UserId } from '@module/social/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

export interface UserEntityPropsInterface
  extends BaseEntityPropsInterface<UserId> {
  authIdentityId: AuthIdentityId;
  name: string;
  username: string;
  bio?: string | null;
}
