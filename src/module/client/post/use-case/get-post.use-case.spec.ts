import { Test, TestingModule } from '@nestjs/testing';

import { PostQueryRepositoryGateway } from '@module/client/post/domain/repository/post/query/post.query.repository.gateway';
import { GetPostQueryResult } from '@module/client/post/domain/repository/post/query/result/get-post.query.result';
import { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import { PostNotFoundError } from '@module/client/post/error/post-not-found.error';
import { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

import { GetPostUseCase } from './get-post.use-case';

describe('GetPostUseCase', () => {
  let useCase: GetPostUseCase;
  let postQueryRepository: jest.Mocked<PostQueryRepositoryGateway>;

  const postId = new PostId();
  const authorId = new UserId();
  const now = new Date();

  const mockPost = GetPostQueryResult.build({
    id: postId,
    authorId,
    content: 'Hello world',
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  });

  beforeEach(async () => {
    postQueryRepository = {
      findOnePostById: jest.fn(),
      listPosts: jest.fn(),
      listPostsByAuthorId: jest.fn(),
    } as unknown as jest.Mocked<PostQueryRepositoryGateway>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPostUseCase,
        { provide: PostQueryRepositoryGateway, useValue: postQueryRepository },
      ],
    }).compile();

    useCase = module.get(GetPostUseCase);
  });

  describe('execute', () => {
    it('should return the post DTO when the post exists', async () => {
      postQueryRepository.findOnePostById.mockResolvedValue(mockPost);

      const result = await useCase.execute(postId);

      expect(result.postId).toEqual(postId);
      expect(result.authorId).toEqual(authorId);
      expect(result.content).toBe('Hello world');
      expect(result.createdAt).toBe(now);
      expect(postQueryRepository.findOnePostById).toHaveBeenCalledWith(postId);
    });

    it('should throw PostNotFoundError when the post does not exist', async () => {
      postQueryRepository.findOnePostById.mockResolvedValue(null);

      await expect(useCase.execute(postId)).rejects.toThrow(PostNotFoundError);
    });
  });
});
