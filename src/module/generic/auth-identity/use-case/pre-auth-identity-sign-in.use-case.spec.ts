import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';
import { PreAuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/pre-auth-identity-sign-in.request.dto';
import {
  PreAuthIdentityAuthenticatorDataSignInResponseDto,
  PreAuthIdentitySignInResponseDto,
} from '@module/generic/auth-identity/dto/response/pre-auth-identity-sign-in.response.dto';
import { SignInMFAOptionEnum } from '@module/generic/auth-identity/enum/sign-in-mfa-option.enum';
import { AuthIdentitySessionConflictError } from '@module/generic/auth-identity/error/auth-identity-session-conflict.error';
import { WrongSignInCredentialsError } from '@module/generic/auth-identity/error/wrong-sign-in-credentials.error';
import { AuthIdentitySessionGateway } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.gateway';
import { AuthenticatorGateway } from '@module/generic/auth-identity/lib/authenticator/authenticator.gateway';
import { AuthenticatorCredentialsOutputModel } from '@module/generic/auth-identity/lib/authenticator/model/output/authenticator-credentials.output.model';
import { EmailMFAGateway } from '@module/generic/auth-identity/lib/email-mfa/email-mfa.gateway';
import { PreAuthIdentitySignInUseCase } from '@module/generic/auth-identity/use-case/pre-auth-identity-sign-in.use-case';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

describe(PreAuthIdentitySignInUseCase.name, () => {
  let useCase: PreAuthIdentitySignInUseCase;
  let compareSpy: jest.SpyInstance<
    boolean,
    Parameters<typeof bcrypt.compareSync>
  >;

  const mockAuthIdentityId = new AuthIdentityId();

  const queryRepo: jest.Mocked<AuthIdentityQueryRepositoryGateway> = {
    findOneAuthIdentityById: jest.fn(),
    findOneAuthIdentityByEmailOrFederalDocument: jest.fn(),
  } as unknown as jest.Mocked<AuthIdentityQueryRepositoryGateway>;

  const commandRepo: jest.Mocked<AuthIdentityCommandRepositoryGateway> = {
    createAuthIdentity: jest.fn(),
    updateAuthenticatorAppSecret: jest.fn(),
  } as unknown as jest.Mocked<AuthIdentityCommandRepositoryGateway>;

  const txRepo: jest.Mocked<BaseTransactionRepositoryGateway> = {
    execute: jest.fn(),
  } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

  const authenticatorGateway: jest.Mocked<AuthenticatorGateway> = {
    verifyCode: jest.fn(),
    generateCredentials: jest.fn(),
  } as unknown as jest.Mocked<AuthenticatorGateway>;

  const emailMFAGateway: jest.Mocked<EmailMFAGateway> = {
    validateSignInCode: jest.fn(),
    generatePersistAndSendSignInCode: jest.fn(),
  } as unknown as jest.Mocked<EmailMFAGateway>;

  const sessionGateway: jest.Mocked<AuthIdentitySessionGateway> = {
    createSession: jest.fn(),
    getSessionDataFromJwt: jest.fn(),
    deleteSession: jest.fn(),
    getSession: jest.fn(),
  } as unknown as jest.Mocked<AuthIdentitySessionGateway>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PreAuthIdentitySignInUseCase,
        { provide: AuthIdentityQueryRepositoryGateway, useValue: queryRepo },
        {
          provide: AuthIdentityCommandRepositoryGateway,
          useValue: commandRepo,
        },
        { provide: BaseTransactionRepositoryGateway, useValue: txRepo },
        { provide: AuthenticatorGateway, useValue: authenticatorGateway },
        { provide: EmailMFAGateway, useValue: emailMFAGateway },
        { provide: AuthIdentitySessionGateway, useValue: sessionGateway },
      ],
    }).compile();

    useCase = module.get(PreAuthIdentitySignInUseCase);

    compareSpy = jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

    jest.clearAllMocks();
  });

  afterEach(() => compareSpy.mockRestore());

  const validBcryptHash =
    '$2b$10$zjZfs7ZyTbnKcECIr1FjNesPiJFFBgU2BeH45LZcKNFx0PEAsddE2';

  const createValidDto = (
    overrides?: Partial<PreAuthIdentitySignInRequestDto>,
  ): PreAuthIdentitySignInRequestDto =>
    PreAuthIdentitySignInRequestDto.build({
      email: new Email('user@example.com'),
      password: 'ValidPassword123',
      mfaOption: SignInMFAOptionEnum.EMAIL,
      ...overrides,
    });

  const createAuthIdentity = (
    overrides?: Partial<GetAuthIdentityQueryResult>,
  ): GetAuthIdentityQueryResult =>
    GetAuthIdentityQueryResult.build({
      id: mockAuthIdentityId,
      email: new Email('user@example.com'),
      federalDocument: new FederalDocument('12345678900'),
      password: new HashedPassword(validBcryptHash),
      authenticatorAppSecret: 'SECRET123',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      ...overrides,
    });

  it('EMAIL: should send code and return customer userLevel (no active session)', async () => {
    const dto = createValidDto({ mfaOption: SignInMFAOptionEnum.EMAIL });
    const authIdentity = createAuthIdentity();

    queryRepo.findOneAuthIdentityByEmailOrFederalDocument.mockResolvedValueOnce(
      authIdentity,
    );
    sessionGateway.getSession.mockResolvedValueOnce(null);
    emailMFAGateway.generatePersistAndSendSignInCode.mockResolvedValueOnce();

    const result = await useCase.execute(dto);

    expect(sessionGateway.getSession).toHaveBeenCalledWith(authIdentity.id);
    expect(result).toBeInstanceOf(PreAuthIdentitySignInResponseDto);
    expect(result.userLevel).toBe(UserLevelEnum.CUSTOMER);
    expect(
      emailMFAGateway.generatePersistAndSendSignInCode,
    ).toHaveBeenCalledWith(authIdentity.id, authIdentity.email);
  });

  it('should throw AuthIdentitySessionConflictError when there is an active session and forceNewSession is not true', async () => {
    const dto = createValidDto();
    const authIdentity = createAuthIdentity();

    queryRepo.findOneAuthIdentityByEmailOrFederalDocument.mockResolvedValueOnce(
      authIdentity,
    );
    sessionGateway.getSession.mockResolvedValueOnce(new Guid());

    await expect(useCase.execute(dto)).rejects.toThrow(
      AuthIdentitySessionConflictError,
    );

    expect(
      emailMFAGateway.generatePersistAndSendSignInCode,
    ).not.toHaveBeenCalled();
    expect(authenticatorGateway.generateCredentials).not.toHaveBeenCalled();
  });

  it('should proceed when there is an active session but forceNewSession === true', async () => {
    const dto = createValidDto({ forceNewSession: true });
    const authIdentity = createAuthIdentity();

    queryRepo.findOneAuthIdentityByEmailOrFederalDocument.mockResolvedValueOnce(
      authIdentity,
    );
    sessionGateway.getSession.mockResolvedValueOnce(new Guid());
    emailMFAGateway.generatePersistAndSendSignInCode.mockResolvedValueOnce();

    const result = await useCase.execute(dto);

    expect(sessionGateway.getSession).toHaveBeenCalledWith(authIdentity.id);
    expect(result).toBeInstanceOf(PreAuthIdentitySignInResponseDto);
    expect(result.userLevel).toBe(UserLevelEnum.CUSTOMER);
  });

  it('AUTH APP with missing secret: should generate, persist and return authenticator data (no active session)', async () => {
    const dto = createValidDto({
      mfaOption: SignInMFAOptionEnum.AUTHENTICATOR_APP,
    });
    const authIdentity = createAuthIdentity({ authenticatorAppSecret: null });

    const credentials = AuthenticatorCredentialsOutputModel.build({
      secret: 'NEWSECRET123',
      base32: 'BASE32SECRET',
      qrCode: 'data:image/png;base64,MOCK',
      otpauth_url: 'otpauth://totp/App:user@example.com?secret=BASE32SECRET',
    });

    queryRepo.findOneAuthIdentityByEmailOrFederalDocument.mockResolvedValueOnce(
      authIdentity,
    );
    sessionGateway.getSession.mockResolvedValueOnce(null);
    authenticatorGateway.generateCredentials.mockResolvedValueOnce(credentials);

    const txCallback: TransactionType = jest.fn().mockResolvedValue(undefined);
    commandRepo.updateAuthenticatorAppSecret.mockReturnValueOnce(txCallback);

    const commit = jest.fn().mockResolvedValue(undefined);
    const rollback = jest.fn().mockResolvedValue(undefined);
    txRepo.execute.mockResolvedValueOnce(
      new TransactionOutputModel(commit, rollback),
    );

    const result = await useCase.execute(dto);

    expect(authenticatorGateway.generateCredentials).toHaveBeenCalledWith(
      authIdentity.email.toString(),
    );
    expect(commandRepo.updateAuthenticatorAppSecret).toHaveBeenCalledWith(
      authIdentity.id,
      credentials.secret,
    );
    expect(txRepo.execute).toHaveBeenCalledWith(txCallback);
    expect(commit).toHaveBeenCalledTimes(1);

    expect(result).toBeInstanceOf(PreAuthIdentitySignInResponseDto);
    expect(result.userLevel).toBeUndefined();
    expect(result.authenticatorData).toBeInstanceOf(
      PreAuthIdentityAuthenticatorDataSignInResponseDto,
    );
    expect(result.authenticatorData?.base32).toBe(credentials.base32);
  });

  it('AUTH APP with present secret: should not generate credentials and should return user level (no active session)', async () => {
    const dto = createValidDto({
      mfaOption: SignInMFAOptionEnum.AUTHENTICATOR_APP,
    });
    const authIdentity = createAuthIdentity({
      authenticatorAppSecret: 'ALREADY_SET',
    });

    queryRepo.findOneAuthIdentityByEmailOrFederalDocument.mockResolvedValueOnce(
      authIdentity,
    );
    sessionGateway.getSession.mockResolvedValueOnce(null);

    const result = await useCase.execute(dto);

    expect(authenticatorGateway.generateCredentials).not.toHaveBeenCalled();
    expect(commandRepo.updateAuthenticatorAppSecret).not.toHaveBeenCalled();
    expect(txRepo.execute).not.toHaveBeenCalled();

    expect(result).toBeInstanceOf(PreAuthIdentitySignInResponseDto);
    expect(result.userLevel).toBe(UserLevelEnum.CUSTOMER);
    expect(result.authenticatorData).toBeUndefined();
  });

  it('missing identifier throws WrongSignInCredentialsError', async () => {
    const dto = PreAuthIdentitySignInRequestDto.build({
      password: 'some-password',
      mfaOption: SignInMFAOptionEnum.EMAIL,
    });

    await expect(useCase.execute(dto)).rejects.toThrow(
      WrongSignInCredentialsError,
    );
  });

  it('authIdentity not found throws WrongSignInCredentialsError', async () => {
    const dto = createValidDto();

    queryRepo.findOneAuthIdentityByEmailOrFederalDocument.mockResolvedValueOnce(
      null,
    );

    await expect(useCase.execute(dto)).rejects.toThrow(
      WrongSignInCredentialsError,
    );
  });

  it('wrong password throws WrongSignInCredentialsError', async () => {
    const dto = createValidDto();

    compareSpy.mockReturnValueOnce(false);

    const authIdentity = createAuthIdentity();
    queryRepo.findOneAuthIdentityByEmailOrFederalDocument.mockResolvedValueOnce(
      authIdentity,
    );

    await expect(useCase.execute(dto)).rejects.toThrow(
      WrongSignInCredentialsError,
    );
  });
});
