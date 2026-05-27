import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ForbiddenError } from '@core/error/forbidden.error';
import { PostCommandRepositoryGateway } from '@module/client/post/domain/repository/post/command/post.command.repository.gateway';
import { PostQueryRepositoryGateway } from '@module/client/post/domain/repository/post/query/post.query.repository.gateway';
import { PostEntity } from '@module/client/post/domain/schema/entity/post/post.entity';
import { PostEntityPropsInputModel } from '@module/client/post/domain/schema/entity/post/post.entity.props.input.model';
import { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import { UpdatePostRequestDto } from '@module/client/post/dto/request/update-post.request.dto';
import { UpdatePostResponseDto } from '@module/client/post/dto/response/update-post.response.dto';
import { PostNotFoundError } from '@module/client/post/error/post-not-found.error';
import { UserQueryRepositoryGateway } from '@module/client/user/domain/repository/user/query/user.query.repository.gateway';
import { UserNotFoundError } from '@module/client/user/error/user-not-found.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export class PostForbiddenError extends ForbiddenError {
  protected override readonly _type = PostForbiddenError.name;

  public constructor() {
    super('You are not allowed to edit this post.');
  }
}

@Injectable()
export class UpdatePostUseCase {
  protected readonly _type = UpdatePostUseCase.name;

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
    dto: UpdatePostRequestDto,
  ): Promise<UpdatePostResponseDto> {
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
      throw new PostForbiddenError();
    }

    const updatedPost = new PostEntity(
      PostEntityPropsInputModel.build({
        id: post.id,
        authorId: post.authorId,
        content: dto.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        deletedAt: post.deletedAt,
      }),
    );

    const updatePost = this.postCommandRepositoryGateway.updatePost(
      postId,
      updatedPost,
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(updatePost);

    await transaction.commit();

    return UpdatePostResponseDto.build({ postId: post.id });
  }
}
