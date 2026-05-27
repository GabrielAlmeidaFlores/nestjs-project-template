import { BaseEntityPropsInputModel } from '@core/domain/schema/entity/base/base.entity.props.input.model';

import type { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import type { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

export class PostEntityPropsInputModel extends BaseEntityPropsInputModel<PostId> {
  protected override readonly _type = PostEntityPropsInputModel.name;

  public authorId: UserId;
  public content: string;
}
