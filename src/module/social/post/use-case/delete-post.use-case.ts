import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ForbiddenError } from '@core/error/forbidden.error';
import { PostCommandRepositoryGateway } from '@module/social/post/domain/repository/post/command/post.command.repository.gateway';
import { PostQueryRepositoryGateway } from '@module/social/post/domain/repository/post/query/post.query.repository.gateway';
import { DeletePostResponseDto } from '@module/social/post/dto/response/delete-post.response.dto';
import { PostNotFoundError } from '@module/social/post/error/post-not-found.error';
import { PostId } from '@module/social/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import { UserQueryRepositoryGateway } from '@module/social/user/domain/repository/user/query/user.query.repository.gateway';
import { UserNotFoundError } from '@module/social/user/error/user-not-found.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export class DeletePostForbiddenError extends ForbiddenError {
  protected override readonly _type = DeletePostForbiddenError.name;

  public constructor() {
    super('You are not allowed to delete this post.');
  }
}

@Injectable()
export class DeletePostUseCase {
  protected readonly _type = DeletePostUseCase.name;

  public constructor(
    @Inject(UserQueryRepositoryGateway)
    private readonly userQueryRepositoryGateway: UserQueryRepositoryGateway,
    @Inject(PostQueryRepositoryGateway)
    private readonly postQueryRepositoryGateway: PostQueryRepositoryGateway,
    @Inject(PostCommandRepositoryGateway)
    private readonly postCommandRepositoryGateway: PostCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    postId: PostId,
  ): Promise<DeletePostResponseDto> {
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

    if (post.authorId.toString() !== user.id.toString()) {
      throw new DeletePostForbiddenError();
    }

    const deletePost = this.postCommandRepositoryGateway.deletePost(postId);

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(deletePost);

    await transaction.commit();

    return DeletePostResponseDto.build({ postId: post.id });
  }
}
