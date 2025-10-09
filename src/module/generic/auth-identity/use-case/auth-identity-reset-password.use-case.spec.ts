import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import bcrypt from 'bcrypt';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';
import { AuthIdentityEntity } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';
import { AuthIdentityResetPasswordRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-reset-password.request.dto';
import { AuthIdentityResetPasswordResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-reset-password.response.dto';
import { NewPasswordMatchesCurrentError } from '@module/generic/auth-identity/error/new-password-matches-current.error';
import { EmailForgotPasswordGateway } from '@module/generic/auth-identity/lib/email-forgot-password/email-forgot-password.gateway';
import { AuthIdentityResetPasswordUseCase } from '@module/generic/auth-identity/use-case/auth-identity-reset-password.use-case';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

jest.mock('bcrypt');

describe(AuthIdentityResetPasswordUseCase.name, () => {
  let useCase: AuthIdentityResetPasswordUseCase;
  const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

  const authIdentityQueryRepositoryGateway: jest.Mocked<AuthIdentityQueryRepositoryGateway> =
    {
      findOneAuthIdentityByEmailOrFederalDocument: jest.fn(),
      findOneAuthIdentityById: jest.fn(),
    };

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    };

  const emailForgotPasswordGateway: jest.Mocked<EmailForgotPasswordGateway> = {
    validateForgotPasswordCode: jest.fn(),
    invalidateForgotPasswordCode: jest.fn(),
    generatePersistAndSendForgotPasswordCode: jest.fn(),
  };

  const authIdentityCommandRepositoryGateway: jest.Mocked<AuthIdentityCommandRepositoryGateway> =
    {
      updateAuthIdentity: jest.fn(),
      createAuthIdentity: jest.fn(),
      updateAuthenticatorAppSecret: jest.fn(),
    };

  const buildDto = (): AuthIdentityResetPasswordRequestDto =>
    AuthIdentityResetPasswordRequestDto.build({
      email: new Email('test@example.com'),
      code: '123456',
      newPassword: 'newStrongPassword123',
    });

  const buildAuthIdentityQueryResult = (): GetAuthIdentityQueryResult =>
    GetAuthIdentityQueryResult.build({
      id: new AuthIdentityId(),
      email: new Email('test@example.com'),
      password: new HashedPassword('oldHashedPassword'),
      federalDocument: new FederalDocument('111.111.111-11'),
      authenticatorAppSecret: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  const buildTransaction = (): jest.Mocked<TransactionOutputModel> =>
    new TransactionOutputModel(
      jest.fn().mockResolvedValue(undefined),
      jest.fn().mockResolvedValue(undefined),
    ) as jest.Mocked<TransactionOutputModel>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthIdentityResetPasswordUseCase,
        {
          provide: AuthIdentityQueryRepositoryGateway,
          useValue: authIdentityQueryRepositoryGateway,
        },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
        {
          provide: EmailForgotPasswordGateway,
          useValue: emailForgotPasswordGateway,
        },
        {
          provide: AuthIdentityCommandRepositoryGateway,
          useValue: authIdentityCommandRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(AuthIdentityResetPasswordUseCase);
    jest.clearAllMocks();
  });

  it('should successfully reset the password', async () => {
    const dto = buildDto();
    const authIdentity = buildAuthIdentityQueryResult();
    const transaction = buildTransaction();

    authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmailOrFederalDocument.mockResolvedValueOnce(
      authIdentity,
    );
    mockedBcrypt.compareSync.mockReturnValue(false);
    emailForgotPasswordGateway.validateForgotPasswordCode.mockResolvedValueOnce(
      true,
    );
    authIdentityCommandRepositoryGateway.updateAuthIdentity.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);
    emailForgotPasswordGateway.invalidateForgotPasswordCode.mockResolvedValueOnce(
      undefined,
    );

    const result = await useCase.execute(dto);

    expect(result).toBeInstanceOf(AuthIdentityResetPasswordResponseDto);
    expect(result.authIdentity).toBe(authIdentity.id);

    expect(
      authIdentityCommandRepositoryGateway.updateAuthIdentity,
    ).toHaveBeenCalledTimes(1);
    const [[, capturedEntity]] = authIdentityCommandRepositoryGateway
      .updateAuthIdentity.mock.calls as [[AuthIdentityId, AuthIdentityEntity]];
    expect(capturedEntity).toBeInstanceOf(AuthIdentityEntity);

    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
    expect(
      emailForgotPasswordGateway.invalidateForgotPasswordCode,
    ).toHaveBeenCalledWith(authIdentity.id);
  });

  it('throws NotFoundException if user is not found', async () => {
    const dto = buildDto();
    authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmailOrFederalDocument.mockResolvedValueOnce(
      null,
    );

    await expect(useCase.execute(dto)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('throws SamePasswordError if the new password is the same as the old one', async () => {
    const dto = buildDto();
    const authIdentity = buildAuthIdentityQueryResult();
    authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmailOrFederalDocument.mockResolvedValueOnce(
      authIdentity,
    );
    mockedBcrypt.compareSync.mockReturnValue(true);

    await expect(useCase.execute(dto)).rejects.toBeInstanceOf(
      NewPasswordMatchesCurrentError,
    );
  });

  it('throws UnauthorizedException if the code is invalid', async () => {
    const dto = buildDto();
    const authIdentity = buildAuthIdentityQueryResult();
    authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmailOrFederalDocument.mockResolvedValueOnce(
      authIdentity,
    );
    mockedBcrypt.compareSync.mockReturnValue(false);
    emailForgotPasswordGateway.validateForgotPasswordCode.mockResolvedValueOnce(
      false,
    );

    await expect(useCase.execute(dto)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });
});
