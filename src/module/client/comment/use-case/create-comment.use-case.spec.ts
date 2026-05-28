import { Test, TestingModule } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { CommentCommandRepositoryGateway } from '@module/client/comment/domain/repository/comment/command/comment.command.repository.gateway';
import { CommentId } from '@module/client/comment/domain/schema/entity/comment/value-object/comment-id/comment-id.value-object';
import { CreateCommentRequestDto } from '@module/client/comment/dto/request/create-comment.request.dto';
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

import { CreateCommentUseCase } from './create-comment.use-case';

describe('CreateCommentUseCase', () => {
  let useCase: CreateCommentUseCase;
  let userQueryRepository: jest.Mocked<UserQueryRepositoryGateway>;
  let postQueryRepository: jest.Mocked<PostQueryRepositoryGateway>;
  let commentCommandRepository: jest.Mocked<CommentCommandRepositoryGateway>;
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
    content: 'Some post content',
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

    commentCommandRepository = {
      createComment: jest.fn().mockReturnValue(jest.fn()),
      deleteComment: jest.fn(),
    } as unknown as jest.Mocked<CommentCommandRepositoryGateway>;

    transactionGateway = {
      execute: jest.fn().mockResolvedValue(
        new TransactionOutputModel(commitMock, jest.fn()),
      ),
    } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCommentUseCase,
        { provide: UserQueryRepositoryGateway, useValue: userQueryRepository },
        { provide: PostQueryRepositoryGateway, useValue: postQueryRepository },
        { provide: CommentCommandRepositoryGateway, useValue: commentCommandRepository },
        { provide: BaseTransactionRepositoryGateway, useValue: transactionGateway },
      ],
    }).compile();

    useCase = module.get(CreateCommentUseCase);
  });

  describe('execute', () => {
    it('should create a comment and commit the transaction', async () => {
      userQueryRepository.findOneUserByAuthIdentityId.mockResolvedValue(mockUser);
      postQueryRepository.findOnePostById.mockResolvedValue(mockPost);
      const dto = CreateCommentRequestDto.build({ content: 'My comment' });

      const result = await useCase.execute(mockSessionData, postId, dto);

      expect(result.commentId).toBeInstanceOf(CommentId);
      expect(commentCommandRepository.createComment).toHaveBeenCalledTimes(1);
      expect(transactionGateway.execute).toHaveBeenCalledTimes(1);
      expect(commitMock).toHaveBeenCalledTimes(1);
    });

    it('should throw UserNotFoundError when the user does not exist', async () => {
      userQueryRepository.findOneUserByAuthIdentityId.mockResolvedValue(null);
      const dto = CreateCommentRequestDto.build({ content: 'My comment' });

      await expect(useCase.execute(mockSessionData, postId, dto)).rejects.toThrow(UserNotFoundError);
      expect(commitMock).not.toHaveBeenCalled();
    });

    it('should throw PostNotFoundError when the post does not exist', async () => {
      userQueryRepository.findOneUserByAuthIdentityId.mockResolvedValue(mockUser);
      postQueryRepository.findOnePostById.mockResolvedValue(null);
      const dto = CreateCommentRequestDto.build({ content: 'My comment' });

      await expect(useCase.execute(mockSessionData, postId, dto)).rejects.toThrow(PostNotFoundError);
      expect(commitMock).not.toHaveBeenCalled();
    });
  });
});
