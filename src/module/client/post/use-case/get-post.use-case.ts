import { Inject, Injectable } from '@nestjs/common';

import { PostQueryRepositoryGateway } from '@module/client/post/domain/repository/post/query/post.query.repository.gateway';
import { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import { GetPostResponseDto } from '@module/client/post/dto/response/get-post.response.dto';
import { PostNotFoundError } from '@module/client/post/error/post-not-found.error';

@Injectable()
export class GetPostUseCase {
  protected readonly _type = GetPostUseCase.name;

  public constructor(
    @Inject(PostQueryRepositoryGateway)
    private readonly postQueryRepositoryGateway: PostQueryRepositoryGateway,
  ) {}

  public async execute(postId: PostId): Promise<GetPostResponseDto> {
    const post = await this.postQueryRepositoryGateway.findOnePostById(postId);

    if (!post) {
      throw new PostNotFoundError();
    }

    return GetPostResponseDto.build({
      postId: post.id,
      authorId: post.authorId,
      content: post.content,
      createdAt: post.createdAt,
    });
  }
}
