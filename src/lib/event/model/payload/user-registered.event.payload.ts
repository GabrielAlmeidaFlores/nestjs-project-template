import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

export class UserRegisteredEventPayload extends BaseBuildableObject {
  public userId: UserId;
  protected override readonly _type = UserRegisteredEventPayload.name;
}
