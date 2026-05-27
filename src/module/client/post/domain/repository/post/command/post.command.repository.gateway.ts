import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PostEntity } from '@module/client/post/domain/schema/entity/post/post.entity';
import type { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';

export abstract class PostCommandRepositoryGateway {
  public abstract createPost(entity: PostEntity): TransactionType;

  public abstract updatePost(
    postId: PostId,
    entity: PostEntity,
  ): TransactionType;

  public abstract deletePost(postId: PostId): TransactionType;
}
