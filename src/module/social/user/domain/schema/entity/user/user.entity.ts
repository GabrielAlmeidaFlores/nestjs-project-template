import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { UserId } from '@module/social/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

import type { UserEntityPropsInterface } from '@module/social/user/domain/schema/entity/user/user.entity.props.interface';

export class UserEntity extends BaseEntity<UserId> {
  public readonly authIdentityId: AuthIdentityId;
  public readonly name: string;
  public readonly username: string;
  public readonly bio: string | null;

  protected readonly _type = UserEntity.name;

  public constructor(props: UserEntityPropsInterface) {
    super(UserId, props);

    this.authIdentityId = props.authIdentityId;
    this.name = props.name;
    this.username = props.username;
    this.bio = props.bio ?? null;
  }
}
