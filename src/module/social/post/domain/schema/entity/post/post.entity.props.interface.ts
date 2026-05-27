import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { UserId } from '@module/social/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';
import type { PostId } from '@module/social/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';

export interface PostEntityPropsInterface
  extends BaseEntityPropsInterface<PostId> {
  authorId: UserId;
  content: string;
}
