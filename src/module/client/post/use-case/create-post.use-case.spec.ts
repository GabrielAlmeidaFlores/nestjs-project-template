import { Test, TestingModule } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { PostCommandRepositoryGateway } from '@module/client/post/domain/repository/post/command/post.command.repository.gateway';
import { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import { CreatePostRequestDto } from '@module/client/post/dto/request/create-post.request.dto';
import { UserQueryRepositoryGateway } from '@module/client/user/domain/repository/user/query/user.query.repository.gateway';
import { GetUserQueryResult } from '@module/client/user/domain/repository/user/query/result/get-user.query.result';
import { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';
import { UserNotFoundError } from '@module/client/user/error/user-not-found.error';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import { CreatePostUseCase } from './create-post.use-case';

describe('CreatePostUseCase', () => {
  let useCase: CreatePostUseCase;
  let userQueryRepository: jest.Mocked<UserQueryRepositoryGateway>;
  let postCommandRepository: jest.Mocked<PostCommandRepositoryGateway>;
  let transactionGateway: jest.Mocked<BaseTransactionRepositoryGateway>;

  const commitMock = jest.fn().mockResolvedValue(undefined);
  const authIdentityId = new AuthIdentityId();
  const userId = new UserId();
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

  beforeEach(async () => {
    commitMock.mockClear();

    userQueryRepository = {
      findOneUserByAuthIdentityId: jest.fn(),
      findOneUserById: jest.fn(),
      findOneUserByUsername: jest.fn(),
      listUsers: jest.fn(),
    } as unknown as jest.Mocked<UserQueryRepositoryGateway>;

    postCommandRepository = {
      createPost: jest.fn().mockReturnValue(jest.fn()),
      updatePost: jest.fn(),
      deletePost: jest.fn(),
    } as unknown as jest.Mocked<PostCommandRepositoryGateway>;

    transactionGateway = {
      execute: jest.fn().mockResolvedValue(
        new TransactionOutputModel(commitMock, jest.fn()),
      ),
    } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePostUseCase,
        { provide: UserQueryRepositoryGateway, useValue: userQueryRepository },
        { provide: PostCommandRepositoryGateway, useValue: postCommandRepository },
        { provide: BaseTransactionRepositoryGateway, useValue: transactionGateway },
      ],
    }).compile();

    useCase = module.get(CreatePostUseCase);
  });

  describe('execute', () => {
    it('should create a post and commit the transaction', async () => {
      userQueryRepository.findOneUserByAuthIdentityId.mockResolvedValue(mockUser);
      const dto = CreatePostRequestDto.build({ content: 'My post content' });

      const result = await useCase.execute(mockSessionData, dto);

      expect(result.postId).toBeInstanceOf(PostId);
      expect(postCommandRepository.createPost).toHaveBeenCalledTimes(1);
      expect(transactionGateway.execute).toHaveBeenCalledTimes(1);
      expect(commitMock).toHaveBeenCalledTimes(1);
    });

    it('should throw UserNotFoundError when the user does not exist', async () => {
      userQueryRepository.findOneUserByAuthIdentityId.mockResolvedValue(null);
      const dto = CreatePostRequestDto.build({ content: 'My post content' });

      await expect(useCase.execute(mockSessionData, dto)).rejects.toThrow(UserNotFoundError);
      expect(commitMock).not.toHaveBeenCalled();
    });
  });
});
