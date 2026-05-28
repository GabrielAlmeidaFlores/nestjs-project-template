import { Test, TestingModule } from '@nestjs/testing';
import bcrypt from 'bcrypt';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';
import { UpdateAuthIdentityRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-update-password.request.dto';
import { NewPasswordMatchesCurrentError } from '@module/generic/auth-identity/error/new-password-matches-current.error';
import { WrongCurrentAuthIdentityPasswordError } from '@module/generic/auth-identity/error/wrong-current-auth-identity-password.error';
import { WrongSignInCredentialsError } from '@module/generic/auth-identity/error/wrong-sign-in-credentials.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import { UpdateAuthIdentityPasswordUseCase } from './update-auth-identity-password.use-case';

jest.mock('bcrypt');

describe('UpdateAuthIdentityPasswordUseCase', () => {
  let useCase: UpdateAuthIdentityPasswordUseCase;
  let authIdentityQueryRepository: jest.Mocked<AuthIdentityQueryRepositoryGateway>;
  let authIdentityCommandRepository: jest.Mocked<AuthIdentityCommandRepositoryGateway>;
  let transactionGateway: jest.Mocked<BaseTransactionRepositoryGateway>;

  const commitMock = jest.fn().mockResolvedValue(undefined);
  const authIdentityId = new AuthIdentityId();
  const email = new Email('test@example.com');
  const now = new Date();

  const mockSessionData = SessionDataModel.build({
    authIdentityId,
    sessionId: authIdentityId,
    userLevel: UserLevelEnum.USER,
  });

  const mockAuthIdentity = GetAuthIdentityQueryResult.build({
    id: authIdentityId,
    email,
    password: new HashedPassword('$2b$10$hashedpw'),
    isActive: true,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  });

  beforeEach(async () => {
    commitMock.mockClear();

    authIdentityQueryRepository = {
      findOneAuthIdentityById: jest.fn(),
      findOneAuthIdentityByEmail: jest.fn(),
      findOneAuthIdentityByEmailWithRelations: jest.fn(),
    } as unknown as jest.Mocked<AuthIdentityQueryRepositoryGateway>;

    authIdentityCommandRepository = {
      createAuthIdentity: jest.fn(),
      updateAuthIdentity: jest.fn().mockReturnValue(jest.fn()),
    } as unknown as jest.Mocked<AuthIdentityCommandRepositoryGateway>;

    transactionGateway = {
      execute: jest.fn().mockResolvedValue(
        new TransactionOutputModel(commitMock, jest.fn()),
      ),
    } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateAuthIdentityPasswordUseCase,
        { provide: BaseTransactionRepositoryGateway, useValue: transactionGateway },
        { provide: AuthIdentityCommandRepositoryGateway, useValue: authIdentityCommandRepository },
        { provide: AuthIdentityQueryRepositoryGateway, useValue: authIdentityQueryRepository },
      ],
    }).compile();

    useCase = module.get(UpdateAuthIdentityPasswordUseCase);
  });

  describe('execute', () => {
    it('should update the password and commit the transaction', async () => {
      authIdentityQueryRepository.findOneAuthIdentityById.mockResolvedValue(mockAuthIdentity);
      (bcrypt.compareSync as jest.Mock)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false);
      const dto = UpdateAuthIdentityRequestDto.build({ password: 'CurrentPass1', newPassword: 'NewPass1' });

      const result = await useCase.execute(mockSessionData, dto);

      expect(result.authIdentity).toBeInstanceOf(AuthIdentityId);
      expect(authIdentityCommandRepository.updateAuthIdentity).toHaveBeenCalledTimes(1);
      expect(transactionGateway.execute).toHaveBeenCalledTimes(1);
      expect(commitMock).toHaveBeenCalledTimes(1);
    });

    it('should throw WrongSignInCredentialsError when auth identity does not exist', async () => {
      authIdentityQueryRepository.findOneAuthIdentityById.mockResolvedValue(null);
      const dto = UpdateAuthIdentityRequestDto.build({ password: 'anypass', newPassword: 'NewPass1' });

      await expect(useCase.execute(mockSessionData, dto)).rejects.toThrow(WrongSignInCredentialsError);
      expect(commitMock).not.toHaveBeenCalled();
    });

    it('should throw WrongCurrentAuthIdentityPasswordError when current password is wrong', async () => {
      authIdentityQueryRepository.findOneAuthIdentityById.mockResolvedValue(mockAuthIdentity);
      (bcrypt.compareSync as jest.Mock).mockReturnValue(false);
      const dto = UpdateAuthIdentityRequestDto.build({ password: 'WrongPass', newPassword: 'NewPass1' });

      await expect(useCase.execute(mockSessionData, dto)).rejects.toThrow(
        WrongCurrentAuthIdentityPasswordError,
      );
      expect(commitMock).not.toHaveBeenCalled();
    });

    it('should throw NewPasswordMatchesCurrentError when new password equals current password', async () => {
      authIdentityQueryRepository.findOneAuthIdentityById.mockResolvedValue(mockAuthIdentity);
      (bcrypt.compareSync as jest.Mock).mockReturnValue(true);
      const dto = UpdateAuthIdentityRequestDto.build({ password: 'SamePass1', newPassword: 'SamePass1' });

      await expect(useCase.execute(mockSessionData, dto)).rejects.toThrow(NewPasswordMatchesCurrentError);
      expect(commitMock).not.toHaveBeenCalled();
    });
  });
});
