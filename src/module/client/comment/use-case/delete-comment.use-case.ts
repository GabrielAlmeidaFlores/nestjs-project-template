import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ForbiddenError } from '@core/error/forbidden.error';
import { CommentCommandRepositoryGateway } from '@module/client/comment/domain/repository/comment/command/comment.command.repository.gateway';
import { CommentQueryRepositoryGateway } from '@module/client/comment/domain/repository/comment/query/comment.query.repository.gateway';
import { CommentId } from '@module/client/comment/domain/schema/entity/comment/value-object/comment-id/comment-id.value-object';
import { DeleteCommentResponseDto } from '@module/client/comment/dto/response/delete-comment.response.dto';
import { CommentNotFoundError } from '@module/client/comment/error/comment-not-found.error';
import { UserQueryRepositoryGateway } from '@module/client/user/domain/repository/user/query/user.query.repository.gateway';
import { UserNotFoundError } from '@module/client/user/error/user-not-found.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export class DeleteCommentForbiddenError extends ForbiddenError {
  protected override readonly _type = DeleteCommentForbiddenError.name;

  public constructor() {
    super('You are not allowed to delete this comment.');
  }
}

@Injectable()
export class DeleteCommentUseCase {
  protected readonly _type = DeleteCommentUseCase.name;

  public constructor(
    @Inject(UserQueryRepositoryGateway)
    private readonly userQueryRepositoryGateway: UserQueryRepositoryGateway,
    @Inject(CommentQueryRepositoryGateway)
    private readonly commentQueryRepositoryGateway: CommentQueryRepositoryGateway,
    @Inject(CommentCommandRepositoryGateway)
    private readonly commentCommandRepositoryGateway: CommentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    commentId: CommentId,
  ): Promise<DeleteCommentResponseDto> {
    const user =
      await this.userQueryRepositoryGateway.findOneUserByAuthIdentityId(
        sessionData.authIdentityId,
      );

    if (!user) {
      throw new UserNotFoundError();
    }

    const comment =
      await this.commentQueryRepositoryGateway.findOneCommentById(commentId);

    if (!comment) {
      throw new CommentNotFoundError();
    }

    if (comment.authorId.toString() !== user.id.toString()) {
      throw new DeleteCommentForbiddenError();
    }

    const deleteComment =
      this.commentCommandRepositoryGateway.deleteComment(commentId);

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(deleteComment);

    await transaction.commit();

    return DeleteCommentResponseDto.build({ commentId: comment.id });
  }
}
