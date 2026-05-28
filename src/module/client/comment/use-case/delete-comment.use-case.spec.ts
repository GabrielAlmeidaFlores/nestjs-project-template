import { Test, TestingModule } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { CommentCommandRepositoryGateway } from '@module/client/comment/domain/repository/comment/command/comment.command.repository.gateway';
import { CommentQueryRepositoryGateway } from '@module/client/comment/domain/repository/comment/query/comment.query.repository.gateway';
import { GetCommentQueryResult } from '@module/client/comment/domain/repository/comment/query/result/get-comment.query.result';
import { CommentId } from '@module/client/comment/domain/schema/entity/comment/value-object/comment-id/comment-id.value-object';
import { CommentNotFoundError } from '@module/client/comment/error/comment-not-found.error';
import { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import { UserQueryRepositoryGateway } from '@module/client/user/domain/repository/user/query/user.query.repository.gateway';
import { GetUserQueryResult } from '@module/client/user/domain/repository/user/query/result/get-user.query.result';
import { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';
import { UserNotFoundError } from '@module/client/user/error/user-not-found.error';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import { DeleteCommentForbiddenError, DeleteCommentUseCase } from './delete-comment.use-case';

describe('DeleteCommentUseCase', () => {
  let useCase: DeleteCommentUseCase;
  let userQueryRepository: jest.Mocked<UserQueryRepositoryGateway>;
  let commentQueryRepository: jest.Mocked<CommentQueryRepositoryGateway>;
  let commentCommandRepository: jest.Mocked<CommentCommandRepositoryGateway>;
  let transactionGateway: jest.Mocked<BaseTransactionRepositoryGateway>;

  const commitMock = jest.fn().mockResolvedValue(undefined);
  const authIdentityId = new AuthIdentityId();
  const userId = new UserId();
  const commentId = new CommentId();
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

  const mockComment = GetCommentQueryResult.build({
    id: commentId,
    postId,
    authorId: userId,
    content: 'A comment',
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

    commentQueryRepository = {
      findOneCommentById: jest.fn(),
      listCommentsByPostId: jest.fn(),
    } as unknown as jest.Mocked<CommentQueryRepositoryGateway>;

    commentCommandRepository = {
      createComment: jest.fn(),
      deleteComment: jest.fn().mockReturnValue(jest.fn()),
    } as unknown as jest.Mocked<CommentCommandRepositoryGateway>;

    transactionGateway = {
      execute: jest.fn().mockResolvedValue(
        new TransactionOutputModel(commitMock, jest.fn()),
      ),
    } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteCommentUseCase,
        { provide: UserQueryRepositoryGateway, useValue: userQueryRepository },
        { provide: CommentQueryRepositoryGateway, useValue: commentQueryRepository },
        { provide: CommentCommandRepositoryGateway, useValue: commentCommandRepository },
        { provide: BaseTransactionRepositoryGateway, useValue: transactionGateway },
      ],
    }).compile();

    useCase = module.get(DeleteCommentUseCase);
  });

  describe('execute', () => {
    it('should delete the comment and commit the transaction', async () => {
      userQueryRepository.findOneUserByAuthIdentityId.mockResolvedValue(mockUser);
      commentQueryRepository.findOneCommentById.mockResolvedValue(mockComment);

      const result = await useCase.execute(mockSessionData, commentId);

      expect(result.commentId).toEqual(commentId);
      expect(commentCommandRepository.deleteComment).toHaveBeenCalledWith(commentId);
      expect(transactionGateway.execute).toHaveBeenCalledTimes(1);
      expect(commitMock).toHaveBeenCalledTimes(1);
    });

    it('should throw UserNotFoundError when the user does not exist', async () => {
      userQueryRepository.findOneUserByAuthIdentityId.mockResolvedValue(null);

      await expect(useCase.execute(mockSessionData, commentId)).rejects.toThrow(UserNotFoundError);
      expect(commitMock).not.toHaveBeenCalled();
    });

    it('should throw CommentNotFoundError when the comment does not exist', async () => {
      userQueryRepository.findOneUserByAuthIdentityId.mockResolvedValue(mockUser);
      commentQueryRepository.findOneCommentById.mockResolvedValue(null);

      await expect(useCase.execute(mockSessionData, commentId)).rejects.toThrow(CommentNotFoundError);
      expect(commitMock).not.toHaveBeenCalled();
    });

    it('should throw DeleteCommentForbiddenError when the user is not the author', async () => {
      const otherUserId = new UserId();
      const commentByOther = GetCommentQueryResult.build({
        id: commentId,
        postId,
        authorId: otherUserId,
        content: 'A comment',
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      });

      userQueryRepository.findOneUserByAuthIdentityId.mockResolvedValue(mockUser);
      commentQueryRepository.findOneCommentById.mockResolvedValue(commentByOther);

      await expect(useCase.execute(mockSessionData, commentId)).rejects.toThrow(DeleteCommentForbiddenError);
      expect(commitMock).not.toHaveBeenCalled();
    });
  });
});
