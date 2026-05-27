import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { PostCommandRepositoryGateway } from '@module/client/post/domain/repository/post/command/post.command.repository.gateway';
import { PostEntity } from '@module/client/post/domain/schema/entity/post/post.entity';
import { PostEntityPropsInputModel } from '@module/client/post/domain/schema/entity/post/post.entity.props.input.model';
import { CreatePostRequestDto } from '@module/client/post/dto/request/create-post.request.dto';
import { CreatePostResponseDto } from '@module/client/post/dto/response/create-post.response.dto';
import { UserQueryRepositoryGateway } from '@module/client/user/domain/repository/user/query/user.query.repository.gateway';
import { UserNotFoundError } from '@module/client/user/error/user-not-found.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreatePostUseCase {
  protected readonly _type = CreatePostUseCase.name;

  public constructor(
    @Inject(UserQueryRepositoryGateway)
    private readonly userQueryRepositoryGateway: UserQueryRepositoryGateway,
    @Inject(PostCommandRepositoryGateway)
    private readonly postCommandRepositoryGateway: PostCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    dto: CreatePostRequestDto,
  ): Promise<CreatePostResponseDto> {
    const user =
      await this.userQueryRepositoryGateway.findOneUserByAuthIdentityId(
        sessionData.authIdentityId,
      );

    if (!user) {
      throw new UserNotFoundError();
    }

    const post = new PostEntity(
      PostEntityPropsInputModel.build({
        authorId: user.id,
        content: dto.content,
      }),
    );

    const createPost = this.postCommandRepositoryGateway.createPost(post);

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(createPost);

    await transaction.commit();

    return CreatePostResponseDto.build({ postId: post.id });
  }
}
