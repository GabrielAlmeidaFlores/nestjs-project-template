import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CommentEntity } from '@module/client/comment/domain/schema/entity/comment/comment.entity';
import type { CommentId } from '@module/client/comment/domain/schema/entity/comment/value-object/comment-id/comment-id.value-object';

export abstract class CommentCommandRepositoryGateway {
  public abstract createComment(entity: CommentEntity): TransactionType;

  public abstract deleteComment(commentId: CommentId): TransactionType;
}
