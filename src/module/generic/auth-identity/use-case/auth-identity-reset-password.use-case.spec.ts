import { NotFoundException, UnauthorizedException } from '@nestjs/common';
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
import { AuthIdentityResetPasswordRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-reset-password.request.dto';
import { NewPasswordMatchesCurrentError } from '@module/generic/auth-identity/error/new-password-matches-current.error';
import { EmailForgotPasswordGateway } from '@module/generic/auth-identity/lib/email-forgot-password/email-forgot-password.gateway';

import { AuthIdentityResetPasswordUseCase } from './auth-identity-reset-password.use-case';

jest.mock('bcrypt');

describe('AuthIdentityResetPasswordUseCase', () => {
  let useCase: AuthIdentityResetPasswordUseCase;
  let authIdentityQueryRepository: jest.Mocked<AuthIdentityQueryRepositoryGateway>;
  let authIdentityCommandRepository: jest.Mocked<AuthIdentityCommandRepositoryGateway>;
  let emailForgotPasswordGateway: jest.Mocked<EmailForgotPasswordGateway>;
  let transactionGateway: jest.Mocked<BaseTransactionRepositoryGateway>;

  const commitMock = jest.fn().mockResolvedValue(undefined);
  const email = new Email('test@example.com');
  const now = new Date();
  const authIdentityId = new AuthIdentityId();

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

    emailForgotPasswordGateway = {
      generatePersistAndSendForgotPasswordCode: jest.fn(),
      validateForgotPasswordCode: jest.fn().mockResolvedValue(true),
      invalidateForgotPasswordCode: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<EmailForgotPasswordGateway>;

    transactionGateway = {
      execute: jest.fn().mockResolvedValue(
        new TransactionOutputModel(commitMock, jest.fn()),
      ),
    } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthIdentityResetPasswordUseCase,
        { provide: AuthIdentityQueryRepositoryGateway, useValue: authIdentityQueryRepository },
        { provide: BaseTransactionRepositoryGateway, useValue: transactionGateway },
        { provide: EmailForgotPasswordGateway, useValue: emailForgotPasswordGateway },
        { provide: AuthIdentityCommandRepositoryGateway, useValue: authIdentityCommandRepository },
      ],
    }).compile();

    useCase = module.get(AuthIdentityResetPasswordUseCase);
  });

  describe('execute', () => {
    it('should reset the password and commit the transaction', async () => {
      authIdentityQueryRepository.findOneAuthIdentityByEmail.mockResolvedValue(mockAuthIdentity);
      (bcrypt.compareSync as jest.Mock).mockReturnValue(false);
      emailForgotPasswordGateway.validateForgotPasswordCode.mockResolvedValue(true);
      const dto = AuthIdentityResetPasswordRequestDto.build({ email, newPassword: 'NewPass1', code: '123456' });

      const result = await useCase.execute(dto);

      expect(result.authIdentity).toEqual(authIdentityId);
      expect(authIdentityCommandRepository.updateAuthIdentity).toHaveBeenCalledTimes(1);
      expect(commitMock).toHaveBeenCalledTimes(1);
      expect(emailForgotPasswordGateway.invalidateForgotPasswordCode).toHaveBeenCalledWith(
        authIdentityId,
      );
    });

    it('should throw NotFoundException when the auth identity does not exist', async () => {
      authIdentityQueryRepository.findOneAuthIdentityByEmail.mockResolvedValue(null);
      const dto = AuthIdentityResetPasswordRequestDto.build({ email, newPassword: 'NewPass1', code: '123456' });

      await expect(useCase.execute(dto)).rejects.toThrow(NotFoundException);
      expect(commitMock).not.toHaveBeenCalled();
    });

    it('should throw NewPasswordMatchesCurrentError when the new password is the same as current', async () => {
      authIdentityQueryRepository.findOneAuthIdentityByEmail.mockResolvedValue(mockAuthIdentity);
      (bcrypt.compareSync as jest.Mock).mockReturnValue(true);
      const dto = AuthIdentityResetPasswordRequestDto.build({ email, newPassword: 'SamePass1', code: '123456' });

      await expect(useCase.execute(dto)).rejects.toThrow(NewPasswordMatchesCurrentError);
      expect(commitMock).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException when the reset code is invalid', async () => {
      authIdentityQueryRepository.findOneAuthIdentityByEmail.mockResolvedValue(mockAuthIdentity);
      (bcrypt.compareSync as jest.Mock).mockReturnValue(false);
      emailForgotPasswordGateway.validateForgotPasswordCode.mockResolvedValue(false);
      const dto = AuthIdentityResetPasswordRequestDto.build({ email, newPassword: 'NewPass1', code: 'badcode' });

      await expect(useCase.execute(dto)).rejects.toThrow(UnauthorizedException);
      expect(commitMock).not.toHaveBeenCalled();
    });
  });
});
