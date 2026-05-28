import { Test, TestingModule } from '@nestjs/testing';

import { UserQueryRepositoryGateway } from '@module/client/user/domain/repository/user/query/user.query.repository.gateway';
import { GetUserQueryResult } from '@module/client/user/domain/repository/user/query/result/get-user.query.result';
import { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';
import { UserNotFoundError } from '@module/client/user/error/user-not-found.error';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

import { GetUserUseCase } from './get-user.use-case';

describe('GetUserUseCase', () => {
  let useCase: GetUserUseCase;
  let userQueryRepository: jest.Mocked<UserQueryRepositoryGateway>;

  const userId = new UserId();
  const authIdentityId = new AuthIdentityId();
  const now = new Date();

  const mockUserWithBio = GetUserQueryResult.build({
    id: userId,
    authIdentityId,
    name: 'Test User',
    username: 'testuser',
    bio: 'A short bio',
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  });

  const mockUserWithoutBio = GetUserQueryResult.build({
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
    userQueryRepository = {
      findOneUserById: jest.fn(),
      findOneUserByAuthIdentityId: jest.fn(),
      findOneUserByUsername: jest.fn(),
      listUsers: jest.fn(),
    } as unknown as jest.Mocked<UserQueryRepositoryGateway>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserUseCase,
        { provide: UserQueryRepositoryGateway, useValue: userQueryRepository },
      ],
    }).compile();

    useCase = module.get(GetUserUseCase);
  });

  describe('execute', () => {
    it('should return the user DTO with bio when the user exists and has a bio', async () => {
      userQueryRepository.findOneUserById.mockResolvedValue(mockUserWithBio);

      const result = await useCase.execute(userId);

      expect(result.userId).toEqual(userId);
      expect(result.name).toBe('Test User');
      expect(result.username).toBe('testuser');
      expect(result.bio).toBe('A short bio');
      expect(result.createdAt).toBe(now);
      expect(userQueryRepository.findOneUserById).toHaveBeenCalledWith(userId);
    });

    it('should return the user DTO without bio when bio is null', async () => {
      userQueryRepository.findOneUserById.mockResolvedValue(mockUserWithoutBio);

      const result = await useCase.execute(userId);

      expect(result.userId).toEqual(userId);
      expect(result.bio).toBeUndefined();
    });

    it('should throw UserNotFoundError when the user does not exist', async () => {
      userQueryRepository.findOneUserById.mockResolvedValue(null);

      await expect(useCase.execute(userId)).rejects.toThrow(UserNotFoundError);
    });
  });
});
