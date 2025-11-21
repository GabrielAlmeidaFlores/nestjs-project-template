import { Test } from '@nestjs/testing';
import bcrypt from 'bcrypt';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';
import { AuthIdentityEntity } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';
import { UpdateAuthIdentityRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-update-password.request.dto';
import { UpdateAuthIdentityResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-update-password.response.dto';
import { NewPasswordMatchesCurrentError } from '@module/generic/auth-identity/error/new-password-matches-current.error';
import { WrongCurrentAuthIdentityPasswordError } from '@module/generic/auth-identity/error/wrong-current-auth-identity-password.error';
import { UpdateAuthIdentityPasswordUseCase } from '@module/generic/auth-identity/use-case/update-auth-identity-password.use-case';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

jest.mock('bcrypt');

describe(UpdateAuthIdentityPasswordUseCase.name, () => {
  let useCase: UpdateAuthIdentityPasswordUseCase;
  const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

  const authIdentityQueryRepositoryGateway = {
    findOneAuthIdentityById: jest.fn(),
  } as unknown as jest.Mocked<AuthIdentityQueryRepositoryGateway>;

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

  const authIdentityCommandRepositoryGateway: jest.Mocked<AuthIdentityCommandRepositoryGateway> =
    {
      updateAuthIdentity: jest.fn(),
    } as unknown as jest.Mocked<AuthIdentityCommandRepositoryGateway>;

  const buildSessionData = (): SessionDataModel =>
    SessionDataModel.build({
      authIdentityId: new AuthIdentityId(),
      sessionId: new Guid(),
      userLevel: UserLevelEnum.CUSTOMER,
    });

  const buildDto = (): UpdateAuthIdentityRequestDto =>
    UpdateAuthIdentityRequestDto.build({
      password: 'currentPassword123',
      newPassword: 'newStrongPassword456',
    });

  const buildAuthIdentityQueryResult = (): GetAuthIdentityQueryResult =>
    GetAuthIdentityQueryResult.build({
      id: new AuthIdentityId(),
      email: new Email('test@example.com'),
      password: new HashedPassword('hashedCurrentPassword'),
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
        UpdateAuthIdentityPasswordUseCase,
        {
          provide: AuthIdentityQueryRepositoryGateway,
          useValue: authIdentityQueryRepositoryGateway,
        },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
        {
          provide: AuthIdentityCommandRepositoryGateway,
          useValue: authIdentityCommandRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(UpdateAuthIdentityPasswordUseCase);
    jest.clearAllMocks();
  });

  it('should successfully update the password', async () => {
    const sessionData = buildSessionData();
    const dto = buildDto();
    const authIdentity = buildAuthIdentityQueryResult();
    const transaction = buildTransaction();

    authIdentityQueryRepositoryGateway.findOneAuthIdentityById.mockResolvedValueOnce(
      authIdentity,
    );
    mockedBcrypt.compareSync
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);
    authIdentityCommandRepositoryGateway.updateAuthIdentity.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    const result = await useCase.execute(sessionData, dto);

    expect(result).toBeInstanceOf(UpdateAuthIdentityResponseDto);
    expect(result.authIdentity).toEqual(authIdentity.id);

    expect(
      authIdentityQueryRepositoryGateway.findOneAuthIdentityById,
    ).toHaveBeenCalledWith(sessionData.authIdentityId);
    expect(
      authIdentityCommandRepositoryGateway.updateAuthIdentity,
    ).toHaveBeenCalledTimes(1);
    const [[, capturedEntity]] = authIdentityCommandRepositoryGateway
      .updateAuthIdentity.mock.calls as [[AuthIdentityId, AuthIdentityEntity]];
    expect(capturedEntity).toBeInstanceOf(AuthIdentityEntity);

    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('should throw CustomerNotFoundError when auth identity is not found', async () => {
    const sessionData = buildSessionData();
    const dto = buildDto();

    authIdentityQueryRepositoryGateway.findOneAuthIdentityById.mockResolvedValueOnce(
      null,
    );

    await expect(useCase.execute(sessionData, dto)).rejects.toBeInstanceOf(
      CustomerNotFoundError,
    );

    expect(
      authIdentityQueryRepositoryGateway.findOneAuthIdentityById,
    ).toHaveBeenCalledWith(sessionData.authIdentityId);
  });

  it('should throw WrongCurrentAuthIdentityPasswordError when current password is incorrect', async () => {
    const sessionData = buildSessionData();
    const dto = buildDto();
    const authIdentity = buildAuthIdentityQueryResult();

    authIdentityQueryRepositoryGateway.findOneAuthIdentityById.mockResolvedValueOnce(
      authIdentity,
    );
    mockedBcrypt.compareSync.mockReturnValueOnce(false);

    await expect(useCase.execute(sessionData, dto)).rejects.toBeInstanceOf(
      WrongCurrentAuthIdentityPasswordError,
    );

    expect(
      authIdentityQueryRepositoryGateway.findOneAuthIdentityById,
    ).toHaveBeenCalledWith(sessionData.authIdentityId);
  });

  it('should throw NewPasswordMatchesCurrentError when new password is the same as current password', async () => {
    const sessionData = buildSessionData();
    const dto = buildDto();
    const authIdentity = buildAuthIdentityQueryResult();

    authIdentityQueryRepositoryGateway.findOneAuthIdentityById.mockResolvedValueOnce(
      authIdentity,
    );
    mockedBcrypt.compareSync
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true);

    await expect(useCase.execute(sessionData, dto)).rejects.toBeInstanceOf(
      NewPasswordMatchesCurrentError,
    );

    expect(
      authIdentityQueryRepositoryGateway.findOneAuthIdentityById,
    ).toHaveBeenCalledWith(sessionData.authIdentityId);
  });
});
