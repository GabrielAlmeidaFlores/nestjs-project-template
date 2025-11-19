import { Test } from '@nestjs/testing';
import bcrypt from 'bcrypt';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { GetAdminQueryResult } from '@module/admin/account/domain/repository/admin/query/result/get-admin.query.result';
import { AdminId } from '@module/admin/account/domain/schema/entity/admin/value-object/admin-id/admin-id.value-object';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { GetAuthIdentityWithRelationsQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity-with-relations.query.result';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';
import { AuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-sign-in.request.dto';
import { AuthIdentitySignInResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-sign-in.response.dto';
import { SignInMFAOptionEnum } from '@module/generic/auth-identity/enum/sign-in-mfa-option.enum';
import { AuthenticatorAppNotConfiguredError } from '@module/generic/auth-identity/error/authenticator-app-not-configured.error';
import { WrongSignInCredentialsError } from '@module/generic/auth-identity/error/wrong-sign-in-credentials.error';
import { AuthIdentitySessionGateway } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.gateway';
import { AuthenticatorGateway } from '@module/generic/auth-identity/lib/authenticator/authenticator.gateway';
import { EmailMFAGateway } from '@module/generic/auth-identity/lib/email-mfa/email-mfa.gateway';
import { AuthIdentitySignInUseCase } from '@module/generic/auth-identity/use-case/auth-identity-sign-in.use-case';
import { ApiCookieEnum } from '@shared/api/enum/api-cookie.enum';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { FastifyReply } from 'fastify';

describe(AuthIdentitySignInUseCase.name, () => {
  let useCase: AuthIdentitySignInUseCase;
  let compareSpy: jest.SpyInstance;

  const mockAuthIdentityId = new AuthIdentityId();
  const mockCustomerId = new CustomerId();

  const queryRepo: jest.Mocked<AuthIdentityQueryRepositoryGateway> = {
    findOneAuthIdentityById: jest.fn(),
    findOneAuthIdentityByEmailOrFederalDocumentWithRelations: jest.fn(),
  } as unknown as jest.Mocked<AuthIdentityQueryRepositoryGateway>;

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
    getSession: jest.fn(),
    deleteSession: jest.fn(),
  } as unknown as jest.Mocked<AuthIdentitySessionGateway>;

  const reply: Partial<FastifyReply> = {
    setCookie: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthIdentitySignInUseCase,
        { provide: AuthIdentityQueryRepositoryGateway, useValue: queryRepo },
        { provide: AuthenticatorGateway, useValue: authenticatorGateway },
        { provide: EmailMFAGateway, useValue: emailMFAGateway },
        { provide: AuthIdentitySessionGateway, useValue: sessionGateway },
      ],
    }).compile();

    useCase = module.get(AuthIdentitySignInUseCase);

    compareSpy = jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

    jest.clearAllMocks();
  });

  afterEach(() => compareSpy.mockRestore());

  const validBcryptHash =
    '$2b$10$zjZfs7ZyTbnKcECIr1FjNesPiJFFBgU2BeH45LZcKNFx0PEAsddE2';

  const createValidDto = (
    overrides?: Partial<AuthIdentitySignInRequestDto>,
  ): AuthIdentitySignInRequestDto =>
    AuthIdentitySignInRequestDto.build({
      email: new Email('user@example.com'),
      password: 'ValidPassword123',
      mfaCode: '123456',
      mfaOption: SignInMFAOptionEnum.EMAIL,
      ...overrides,
    });

  const createAdminResult = (): GetAdminQueryResult =>
    GetAdminQueryResult.build({
      id: new AdminId(),
      name: 'Admin Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  const createCustomerResult = (): GetCustomerQueryResult =>
    GetCustomerQueryResult.build({
      id: mockCustomerId,
      name: 'Customer Name',
      profilePicture: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  const createAuthIdentity = (
    overrides?: Partial<GetAuthIdentityWithRelationsQueryResult>,
  ): GetAuthIdentityWithRelationsQueryResult =>
    GetAuthIdentityWithRelationsQueryResult.build({
      id: mockAuthIdentityId,
      email: new Email('user@example.com'),
      federalDocument: new FederalDocument('12345678900'),
      password: new HashedPassword(validBcryptHash),
      authenticatorAppSecret: 'SECRET123',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      customer: overrides?.customer ?? createCustomerResult(),
      admin: overrides?.admin ?? null,
      ...overrides,
    });

  it('EMAIL MFA: success path and returns CUSTOMER userLevel', async () => {
    const dto = createValidDto({ mfaOption: SignInMFAOptionEnum.EMAIL });
    const authIdentity = createAuthIdentity({ admin: null });
    const userLevel = UserLevelEnum.CUSTOMER;

    queryRepo.findOneAuthIdentityByEmailOrFederalDocumentWithRelations.mockResolvedValueOnce(
      authIdentity,
    );
    emailMFAGateway.validateSignInCode.mockResolvedValueOnce(true);
    sessionGateway.createSession.mockResolvedValueOnce('mock-jwt-token');

    const result = await useCase.execute(reply as FastifyReply, dto);

    expect(result).toBeInstanceOf(AuthIdentitySignInResponseDto);
    expect(result.userLevel).toBe(userLevel);
    expect(sessionGateway.createSession).toHaveBeenCalledWith(
      authIdentity.id,
      userLevel,
    );
    expect(reply.setCookie).toHaveBeenCalledWith(
      ApiCookieEnum.AUTH_TOKEN,
      'mock-jwt-token',
      expect.objectContaining({
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 604800,
      }),
    );
  });

  it('AUTH APP: success path and returns ADMIN userLevel', async () => {
    const dto = createValidDto({
      mfaOption: SignInMFAOptionEnum.AUTHENTICATOR_APP,
    });
    const userLevel = UserLevelEnum.ADMIN;
    const mockAdminResult = createAdminResult();
    const authIdentity = createAuthIdentity({
      authenticatorAppSecret: 'SECRET123',
      admin: mockAdminResult,
    });

    queryRepo.findOneAuthIdentityByEmailOrFederalDocumentWithRelations.mockResolvedValueOnce(
      authIdentity,
    );
    authenticatorGateway.verifyCode.mockReturnValueOnce(true);
    sessionGateway.createSession.mockResolvedValueOnce('jwt-admin');

    const result = await useCase.execute(reply as FastifyReply, dto);

    expect(result).toBeInstanceOf(AuthIdentitySignInResponseDto);
    expect(result.userLevel).toBe(userLevel);
    expect(sessionGateway.createSession).toHaveBeenCalledWith(
      authIdentity.id,
      userLevel,
    );
  });

  it('missing identifier throws WrongSignInCredentialsError', async () => {
    // Arrange
    const dto = AuthIdentitySignInRequestDto.build({
      password: 'some-password',
      mfaCode: '123456',
      mfaOption: SignInMFAOptionEnum.EMAIL,
    });

    await expect(useCase.execute(reply as FastifyReply, dto)).rejects.toThrow(
      WrongSignInCredentialsError,
    );
  });

  it('AUTH APP: null secret throws AuthenticatorAppNotConfiguredError', async () => {
    const dto = createValidDto({
      mfaOption: SignInMFAOptionEnum.AUTHENTICATOR_APP,
    });

    const authIdentity = createAuthIdentity({ authenticatorAppSecret: null });
    queryRepo.findOneAuthIdentityByEmailOrFederalDocumentWithRelations.mockResolvedValueOnce(
      authIdentity,
    );

    await expect(useCase.execute(reply as FastifyReply, dto)).rejects.toThrow(
      AuthenticatorAppNotConfiguredError,
    );
  });

  it('wrong password throws WrongSignInCredentialsError', async () => {
    const dto = createValidDto();
    compareSpy.mockReturnValueOnce(false);

    const authIdentity = createAuthIdentity();
    queryRepo.findOneAuthIdentityByEmailOrFederalDocumentWithRelations.mockResolvedValueOnce(
      authIdentity,
    );

    await expect(useCase.execute(reply as FastifyReply, dto)).rejects.toThrow(
      WrongSignInCredentialsError,
    );
  });

  it('authIdentity not found throws WrongSignInCredentialsError', async () => {
    const dto = createValidDto();
    queryRepo.findOneAuthIdentityByEmailOrFederalDocumentWithRelations.mockResolvedValueOnce(
      null,
    );

    await expect(useCase.execute(reply as FastifyReply, dto)).rejects.toThrow(
      WrongSignInCredentialsError,
    );
  });

  it('EMAIL MFA: invalid code throws WrongSignInCredentialsError', async () => {
    const dto = createValidDto({ mfaOption: SignInMFAOptionEnum.EMAIL });
    const authIdentity = createAuthIdentity();
    queryRepo.findOneAuthIdentityByEmailOrFederalDocumentWithRelations.mockResolvedValueOnce(
      authIdentity,
    );
    emailMFAGateway.validateSignInCode.mockResolvedValueOnce(false);

    await expect(useCase.execute(reply as FastifyReply, dto)).rejects.toThrow(
      WrongSignInCredentialsError,
    );
  });

  it('AUTH APP: secret present and invalid code throws WrongSignInCredentialsError', async () => {
    const dto = createValidDto({
      mfaOption: SignInMFAOptionEnum.AUTHENTICATOR_APP,
      mfaCode: '000000',
    });
    const authIdentity = createAuthIdentity({
      authenticatorAppSecret: 'SECRET123',
    });

    queryRepo.findOneAuthIdentityByEmailOrFederalDocumentWithRelations.mockResolvedValueOnce(
      authIdentity,
    );
    authenticatorGateway.verifyCode.mockReturnValueOnce(false);

    await expect(useCase.execute(reply as FastifyReply, dto)).rejects.toThrow(
      WrongSignInCredentialsError,
    );
  });

  it('AUTH APP: should sign in when mfaCode is the backdoor code (654321)', async () => {
    const dto = createValidDto({
      mfaOption: SignInMFAOptionEnum.AUTHENTICATOR_APP,
      mfaCode: '654321',
    });
    const mockAdminResult = createAdminResult();
    const authIdentity = createAuthIdentity({
      authenticatorAppSecret: 'SECRET123',
      admin: mockAdminResult,
    });
    const userLevel = UserLevelEnum.ADMIN;

    queryRepo.findOneAuthIdentityByEmailOrFederalDocumentWithRelations.mockResolvedValueOnce(
      authIdentity,
    );
    authenticatorGateway.verifyCode.mockReturnValueOnce(false);

    sessionGateway.createSession.mockResolvedValueOnce('jwt-backdoor');

    const result = await useCase.execute(reply as FastifyReply, dto);

    expect(authenticatorGateway.verifyCode).toHaveBeenCalledTimes(1);
    expect(result.userLevel).toBe(userLevel);
    expect(sessionGateway.createSession).toHaveBeenCalledWith(
      authIdentity.id,
      userLevel,
    );
  });
});
