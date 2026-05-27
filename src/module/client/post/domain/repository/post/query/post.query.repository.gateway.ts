import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { GetPostQueryResult } from '@module/client/post/domain/repository/post/query/result/get-post.query.result';
import type { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import type { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

export abstract class PostQueryRepositoryGateway {
  public abstract findOnePostById(
    id: PostId,
  ): Promise<GetPostQueryResult | null>;

  public abstract listPosts(
    pagination: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetPostQueryResult>>;

  public abstract listPostsByAuthorId(
    authorId: UserId,
    pagination: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetPostQueryResult>>;
}
