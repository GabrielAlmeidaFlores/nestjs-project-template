import { BaseEntityPropsInputModel } from '@core/domain/schema/entity/base/base.entity.props.input.model';

import type { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export class UserEntityPropsInputModel extends BaseEntityPropsInputModel<UserId> {
  public authIdentityId: AuthIdentityId;
  public name: string;
  public username: string;
  public bio?: string | null;
  protected override readonly _type = UserEntityPropsInputModel.name;
}
