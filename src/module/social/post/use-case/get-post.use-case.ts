import { Inject, Injectable } from '@nestjs/common';

import { PostQueryRepositoryGateway } from '@module/social/post/domain/repository/post/query/post.query.repository.gateway';
import { GetPostResponseDto } from '@module/social/post/dto/response/get-post.response.dto';
import { PostNotFoundError } from '@module/social/post/error/post-not-found.error';
import { PostId } from '@module/social/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';

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
