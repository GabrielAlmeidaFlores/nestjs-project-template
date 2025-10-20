import { Test } from '@nestjs/testing';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';
import { AuthIdentityForgotPasswordRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-forgot-password.request.dto';
import { WrongSignInCredentialsError } from '@module/generic/auth-identity/error/wrong-sign-in-credentials.error';
import { EmailForgotPasswordGateway } from '@module/generic/auth-identity/lib/email-forgot-password/email-forgot-password.gateway';
import { AuthIdentityForgotPasswordUseCase } from '@module/generic/auth-identity/use-case/auth-identity-forgot-password.use-case';

describe(AuthIdentityForgotPasswordUseCase.name, () => {
  let useCase: AuthIdentityForgotPasswordUseCase;

  const authIdentityQueryRepositoryGateway: jest.Mocked<AuthIdentityQueryRepositoryGateway> =
    {
      findOneAuthIdentityByEmailOrFederalDocument: jest.fn(),
      findOneAuthIdentityById: jest.fn(),
    };

  const emailForgotPassword: jest.Mocked<EmailForgotPasswordGateway> = {
    generatePersistAndSendForgotPasswordCode: jest.fn(),
    validateForgotPasswordCode: jest.fn(),
    invalidateForgotPasswordCode: jest.fn(),
  };

  const buildDto = (): AuthIdentityForgotPasswordRequestDto =>
    AuthIdentityForgotPasswordRequestDto.build({
      email: new Email('usuario@teste.com'),
    });

  const buildAuthIdentityQueryResult = (): GetAuthIdentityQueryResult =>
    GetAuthIdentityQueryResult.build({
      id: new AuthIdentityId(),
      email: new Email('usuario@teste.com'),
      federalDocument: new FederalDocument('111.111.111-11'),
      password: new HashedPassword('senha-hash'),
      authenticatorAppSecret: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthIdentityForgotPasswordUseCase,
        {
          provide: AuthIdentityQueryRepositoryGateway,
          useValue: authIdentityQueryRepositoryGateway,
        },
        {
          provide: EmailForgotPasswordGateway,
          useValue: emailForgotPassword,
        },
      ],
    }).compile();

    useCase = module.get(AuthIdentityForgotPasswordUseCase);
    jest.clearAllMocks();
  });

  it('deve chamar o gateway de e-mail quando o usuário for encontrado', async () => {
    const dto = buildDto();
    const authIdentity = buildAuthIdentityQueryResult();

    authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmailOrFederalDocument.mockResolvedValueOnce(
      authIdentity,
    );
    emailForgotPassword.generatePersistAndSendForgotPasswordCode.mockResolvedValueOnce(
      undefined,
    );

    await useCase.execute(dto);

    expect(
      authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmailOrFederalDocument,
    ).toHaveBeenCalledWith(dto.email);
    expect(
      emailForgotPassword.generatePersistAndSendForgotPasswordCode,
    ).toHaveBeenCalledWith(authIdentity.id, dto.email);
  });

  it('deve lançar WrongSignInCredentialsError quando o usuário não for encontrado', async () => {
    const dto = buildDto();

    authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmailOrFederalDocument.mockResolvedValueOnce(
      null,
    );

    await expect(useCase.execute(dto)).rejects.toBeInstanceOf(
      WrongSignInCredentialsError,
    );
    expect(
      emailForgotPassword.generatePersistAndSendForgotPasswordCode,
    ).not.toHaveBeenCalled();
  });
});
