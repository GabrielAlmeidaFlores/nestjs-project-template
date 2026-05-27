import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { GetCommentQueryResult } from '@module/social/comment/domain/repository/comment/query/result/get-comment.query.result';
import type { CommentId } from '@module/social/comment/domain/schema/entity/comment/value-object/comment-id/comment-id.value-object';
import type { PostId } from '@module/social/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';

export abstract class CommentQueryRepositoryGateway {
  public abstract findOneCommentById(
    id: CommentId,
  ): Promise<GetCommentQueryResult | null>;

  public abstract listCommentsByPostId(
    postId: PostId,
    pagination: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetCommentQueryResult>>;
}
