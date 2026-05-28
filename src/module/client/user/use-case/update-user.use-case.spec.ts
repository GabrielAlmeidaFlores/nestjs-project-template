import { Test, TestingModule } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { UserCommandRepositoryGateway } from '@module/client/user/domain/repository/user/command/user.command.repository.gateway';
import { UserQueryRepositoryGateway } from '@module/client/user/domain/repository/user/query/user.query.repository.gateway';
import { GetUserQueryResult } from '@module/client/user/domain/repository/user/query/result/get-user.query.result';
import { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';
import { UpdateUserRequestDto } from '@module/client/user/dto/request/update-user.request.dto';
import { UserNotFoundError } from '@module/client/user/error/user-not-found.error';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import { UpdateUserUseCase } from './update-user.use-case';

describe('UpdateUserUseCase', () => {
  let useCase: UpdateUserUseCase;
  let userQueryRepository: jest.Mocked<UserQueryRepositoryGateway>;
  let userCommandRepository: jest.Mocked<UserCommandRepositoryGateway>;
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
    name: 'Old Name',
    username: 'olduser',
    bio: 'Old bio',
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  });

  beforeEach(async () => {
    commitMock.mockClear();

    userQueryRepository = {
      findOneUserById: jest.fn(),
      findOneUserByAuthIdentityId: jest.fn(),
      findOneUserByUsername: jest.fn(),
      listUsers: jest.fn(),
    } as unknown as jest.Mocked<UserQueryRepositoryGateway>;

    userCommandRepository = {
      createUser: jest.fn(),
      updateUser: jest.fn().mockReturnValue(jest.fn()),
    } as unknown as jest.Mocked<UserCommandRepositoryGateway>;

    transactionGateway = {
      execute: jest.fn().mockResolvedValue(
        new TransactionOutputModel(commitMock, jest.fn()),
      ),
    } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserUseCase,
        { provide: UserQueryRepositoryGateway, useValue: userQueryRepository },
        { provide: UserCommandRepositoryGateway, useValue: userCommandRepository },
        { provide: BaseTransactionRepositoryGateway, useValue: transactionGateway },
      ],
    }).compile();

    useCase = module.get(UpdateUserUseCase);
  });

  describe('execute', () => {
    it('should update the user and commit the transaction', async () => {
      userQueryRepository.findOneUserByAuthIdentityId.mockResolvedValue(mockUser);
      const dto = UpdateUserRequestDto.build({ name: 'New Name', bio: 'New bio' });

      const result = await useCase.execute(mockSessionData, dto);

      expect(result.userId).toEqual(userId);
      expect(userCommandRepository.updateUser).toHaveBeenCalledTimes(1);
      expect(transactionGateway.execute).toHaveBeenCalledTimes(1);
      expect(commitMock).toHaveBeenCalledTimes(1);
    });

    it('should keep existing name when name is not provided', async () => {
      userQueryRepository.findOneUserByAuthIdentityId.mockResolvedValue(mockUser);
      const dto = UpdateUserRequestDto.build({ bio: 'New bio' });

      const result = await useCase.execute(mockSessionData, dto);

      expect(result.userId).toEqual(userId);
      expect(commitMock).toHaveBeenCalledTimes(1);
    });

    it('should throw UserNotFoundError when the user does not exist', async () => {
      userQueryRepository.findOneUserByAuthIdentityId.mockResolvedValue(null);
      const dto = UpdateUserRequestDto.build({ name: 'New Name' });

      await expect(useCase.execute(mockSessionData, dto)).rejects.toThrow(UserNotFoundError);
      expect(commitMock).not.toHaveBeenCalled();
    });
  });
});
