import { Test, TestingModule } from '@nestjs/testing';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { UserCommandRepositoryGateway } from '@module/client/user/domain/repository/user/command/user.command.repository.gateway';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { AuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-sign-up.request.dto';
import { EmailAlreadyInUseError } from '@module/generic/auth-identity/error/email-already-in-use.error';
import { ValidateAuthIdentitySignUpUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/validate-auth-identity-sign-up.use-case-gateway';

import { AuthIdentitySignUpUseCase } from './auth-identity-sign-up.use-case';

describe('AuthIdentitySignUpUseCase', () => {
  let useCase: AuthIdentitySignUpUseCase;
  let validateSignUpGateway: jest.Mocked<ValidateAuthIdentitySignUpUseCaseGateway>;
  let authIdentityCommandRepository: jest.Mocked<AuthIdentityCommandRepositoryGateway>;
  let userCommandRepository: jest.Mocked<UserCommandRepositoryGateway>;
  let transactionGateway: jest.Mocked<BaseTransactionRepositoryGateway>;

  const commitMock = jest.fn().mockResolvedValue(undefined);
  const email = new Email('new@example.com');

  beforeEach(async () => {
    commitMock.mockClear();

    validateSignUpGateway = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<ValidateAuthIdentitySignUpUseCaseGateway>;

    authIdentityCommandRepository = {
      createAuthIdentity: jest.fn().mockReturnValue(jest.fn()),
      updateAuthIdentity: jest.fn(),
    } as unknown as jest.Mocked<AuthIdentityCommandRepositoryGateway>;

    userCommandRepository = {
      createUser: jest.fn().mockReturnValue(jest.fn()),
      updateUser: jest.fn(),
    } as unknown as jest.Mocked<UserCommandRepositoryGateway>;

    transactionGateway = {
      execute: jest.fn().mockResolvedValue(
        new TransactionOutputModel(commitMock, jest.fn()),
      ),
    } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthIdentitySignUpUseCase,
        { provide: ValidateAuthIdentitySignUpUseCaseGateway, useValue: validateSignUpGateway },
        { provide: AuthIdentityCommandRepositoryGateway, useValue: authIdentityCommandRepository },
        { provide: UserCommandRepositoryGateway, useValue: userCommandRepository },
        { provide: BaseTransactionRepositoryGateway, useValue: transactionGateway },
      ],
    }).compile();

    useCase = module.get(AuthIdentitySignUpUseCase);
  });

  describe('execute', () => {
    it('should create auth identity + user and commit the transaction', async () => {
      const dto = AuthIdentitySignUpRequestDto.build({
        email,
        password: 'ValidPass1',
        name: 'Test User',
        username: 'testuser',
      });

      const result = await useCase.execute(dto);

      expect(result.authIdentityId).toBeInstanceOf(AuthIdentityId);
      expect(validateSignUpGateway.execute).toHaveBeenCalledTimes(1);
      expect(authIdentityCommandRepository.createAuthIdentity).toHaveBeenCalledTimes(1);
      expect(userCommandRepository.createUser).toHaveBeenCalledTimes(1);
      expect(transactionGateway.execute).toHaveBeenCalledTimes(1);
      expect(commitMock).toHaveBeenCalledTimes(1);
    });

    it('should throw EmailAlreadyInUseError when the email is already registered', async () => {
      validateSignUpGateway.execute.mockRejectedValue(new EmailAlreadyInUseError());
      const dto = AuthIdentitySignUpRequestDto.build({
        email,
        password: 'ValidPass1',
        name: 'Test User',
        username: 'testuser',
      });

      await expect(useCase.execute(dto)).rejects.toThrow(EmailAlreadyInUseError);
      expect(commitMock).not.toHaveBeenCalled();
    });
  });
});
