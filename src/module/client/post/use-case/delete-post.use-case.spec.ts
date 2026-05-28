import { Test, TestingModule } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { PostCommandRepositoryGateway } from '@module/client/post/domain/repository/post/command/post.command.repository.gateway';
import { PostQueryRepositoryGateway } from '@module/client/post/domain/repository/post/query/post.query.repository.gateway';
import { GetPostQueryResult } from '@module/client/post/domain/repository/post/query/result/get-post.query.result';
import { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import { PostNotFoundError } from '@module/client/post/error/post-not-found.error';
import { UserQueryRepositoryGateway } from '@module/client/user/domain/repository/user/query/user.query.repository.gateway';
import { GetUserQueryResult } from '@module/client/user/domain/repository/user/query/result/get-user.query.result';
import { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';
import { UserNotFoundError } from '@module/client/user/error/user-not-found.error';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import { DeletePostForbiddenError, DeletePostUseCase } from './delete-post.use-case';

describe('DeletePostUseCase', () => {
  let useCase: DeletePostUseCase;
  let userQueryRepository: jest.Mocked<UserQueryRepositoryGateway>;
  let postQueryRepository: jest.Mocked<PostQueryRepositoryGateway>;
  let postCommandRepository: jest.Mocked<PostCommandRepositoryGateway>;
  let transactionGateway: jest.Mocked<BaseTransactionRepositoryGateway>;

  const commitMock = jest.fn().mockResolvedValue(undefined);
  const authIdentityId = new AuthIdentityId();
  const userId = new UserId();
  const postId = new PostId();
  const now = new Date();

  const mockSessionData = SessionDataModel.build({
    authIdentityId,
    sessionId: authIdentityId,
    userLevel: UserLevelEnum.USER,
  });

  const mockUser = GetUserQueryResult.build({
    id: userId,
    authIdentityId,
    name: 'Test User',
    username: 'testuser',
    bio: null,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  });

  const mockPost = GetPostQueryResult.build({
    id: postId,
    authorId: userId,
    content: 'Some content',
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  });

  beforeEach(async () => {
    commitMock.mockClear();

    userQueryRepository = {
      findOneUserByAuthIdentityId: jest.fn(),
      findOneUserById: jest.fn(),
      findOneUserByUsername: jest.fn(),
      listUsers: jest.fn(),
    } as unknown as jest.Mocked<UserQueryRepositoryGateway>;

    postQueryRepository = {
      findOnePostById: jest.fn(),
      listPosts: jest.fn(),
      listPostsByAuthorId: jest.fn(),
    } as unknown as jest.Mocked<PostQueryRepositoryGateway>;

    postCommandRepository = {
      createPost: jest.fn(),
      updatePost: jest.fn(),
      deletePost: jest.fn().mockReturnValue(jest.fn()),
    } as unknown as jest.Mocked<PostCommandRepositoryGateway>;

    transactionGateway = {
      execute: jest.fn().mockResolvedValue(
        new TransactionOutputModel(commitMock, jest.fn()),
      ),
    } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletePostUseCase,
        { provide: UserQueryRepositoryGateway, useValue: userQueryRepository },
        { provide: PostQueryRepositoryGateway, useValue: postQueryRepository },
        { provide: PostCommandRepositoryGateway, useValue: postCommandRepository },
        { provide: BaseTransactionRepositoryGateway, useValue: transactionGateway },
      ],
    }).compile();

    useCase = module.get(DeletePostUseCase);
  });

  describe('execute', () => {
    it('should delete the post and commit the transaction', async () => {
      userQueryRepository.findOneUserByAuthIdentityId.mockResolvedValue(mockUser);
      postQueryRepository.findOnePostById.mockResolvedValue(mockPost);

      const result = await useCase.execute(mockSessionData, postId);

      expect(result.postId).toEqual(postId);
      expect(postCommandRepository.deletePost).toHaveBeenCalledWith(postId);
      expect(transactionGateway.execute).toHaveBeenCalledTimes(1);
      expect(commitMock).toHaveBeenCalledTimes(1);
    });

    it('should throw UserNotFoundError when the user does not exist', async () => {
      userQueryRepository.findOneUserByAuthIdentityId.mockResolvedValue(null);

      await expect(useCase.execute(mockSessionData, postId)).rejects.toThrow(UserNotFoundError);
      expect(commitMock).not.toHaveBeenCalled();
    });

    it('should throw PostNotFoundError when the post does not exist', async () => {
      userQueryRepository.findOneUserByAuthIdentityId.mockResolvedValue(mockUser);
      postQueryRepository.findOnePostById.mockResolvedValue(null);

      await expect(useCase.execute(mockSessionData, postId)).rejects.toThrow(PostNotFoundError);
      expect(commitMock).not.toHaveBeenCalled();
    });

    it('should throw DeletePostForbiddenError when the user is not the author', async () => {
      const otherUserId = new UserId();
      const postOwnedByOther = GetPostQueryResult.build({
        id: postId,
        authorId: otherUserId,
        content: 'Some content',
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      });

      userQueryRepository.findOneUserByAuthIdentityId.mockResolvedValue(mockUser);
      postQueryRepository.findOnePostById.mockResolvedValue(postOwnedByOther);

      await expect(useCase.execute(mockSessionData, postId)).rejects.toThrow(DeletePostForbiddenError);
      expect(commitMock).not.toHaveBeenCalled();
    });
  });
});
