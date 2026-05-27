import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CommentCommandRepositoryGateway } from '@module/client/comment/domain/repository/comment/command/comment.command.repository.gateway';
import { CommentEntity } from '@module/client/comment/domain/schema/entity/comment/comment.entity';
import { CommentEntityPropsInputModel } from '@module/client/comment/domain/schema/entity/comment/comment.entity.props.input.model';
import { CreateCommentRequestDto } from '@module/client/comment/dto/request/create-comment.request.dto';
import { CreateCommentResponseDto } from '@module/client/comment/dto/response/create-comment.response.dto';
import { PostQueryRepositoryGateway } from '@module/client/post/domain/repository/post/query/post.query.repository.gateway';
import { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import { PostNotFoundError } from '@module/client/post/error/post-not-found.error';
import { UserQueryRepositoryGateway } from '@module/client/user/domain/repository/user/query/user.query.repository.gateway';
import { UserNotFoundError } from '@module/client/user/error/user-not-found.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateCommentUseCase {
  protected readonly _type = CreateCommentUseCase.name;

  public constructor(
    @Inject(UserQueryRepositoryGateway)
    private readonly userQueryRepositoryGateway: UserQueryRepositoryGateway,
    @Inject(PostQueryRepositoryGateway)
    private readonly postQueryRepositoryGateway: PostQueryRepositoryGateway,
    @Inject(CommentCommandRepositoryGateway)
    private readonly commentCommandRepositoryGateway: CommentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    postId: PostId,
    dto: CreateCommentRequestDto,
  ): Promise<CreateCommentResponseDto> {
    const user =
      await this.userQueryRepositoryGateway.findOneUserByAuthIdentityId(
        sessionData.authIdentityId,
      );

    if (!user) {
      throw new UserNotFoundError();
    }

    const post = await this.postQueryRepositoryGateway.findOnePostById(postId);

    if (!post) {
      throw new PostNotFoundError();
    }

    const comment = new CommentEntity(
      CommentEntityPropsInputModel.build({
        postId: post.id,
        authorId: user.id,
        content: dto.content,
      }),
    );

    const createComment =
      this.commentCommandRepositoryGateway.createComment(comment);

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(createComment);

    await transaction.commit();

    return CreateCommentResponseDto.build({ commentId: comment.id });
  }
}
