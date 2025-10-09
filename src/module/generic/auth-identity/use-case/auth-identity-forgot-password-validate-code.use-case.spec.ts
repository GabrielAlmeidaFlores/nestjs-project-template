import { Test } from '@nestjs/testing';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';
import { AuthIdentityForgotPasswordValidateCodeRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-forgot-password-code.request.dto';
import { AuthIdentityForgotPasswordCodeResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-forgot-password-code.response.dto';
import { EmailForgotPasswordGateway } from '@module/generic/auth-identity/lib/email-forgot-password/email-forgot-password.gateway';
import { AuthIdentityForgotPasswordValidateCodeUseCase } from '@module/generic/auth-identity/use-case/auth-identity-forgot-password-validate-code.use-case';

describe(AuthIdentityForgotPasswordValidateCodeUseCase.name, () => {
  let useCase: AuthIdentityForgotPasswordValidateCodeUseCase;

  const authIdentityQueryRepository: jest.Mocked<AuthIdentityQueryRepositoryGateway> =
    {
      findOneAuthIdentityByEmailOrFederalDocument: jest.fn(),
    } as unknown as jest.Mocked<AuthIdentityQueryRepositoryGateway>;

  const emailForgotPassword: jest.Mocked<EmailForgotPasswordGateway> = {
    validateForgotPasswordCode: jest.fn(),
  } as unknown as jest.Mocked<EmailForgotPasswordGateway>;

  const buildDto = (): AuthIdentityForgotPasswordValidateCodeRequestDto =>
    AuthIdentityForgotPasswordValidateCodeRequestDto.build({
      email: new Email('test@example.com'),
      code: '123456',
    });

  const buildAuthIdentityQueryResult = (): GetAuthIdentityQueryResult =>
    GetAuthIdentityQueryResult.build({
      id: new AuthIdentityId(),
      email: new Email('test@example.com'),
      federalDocument: new FederalDocument('52649000865'),
      password: new HashedPassword('hashed_password'),
      authenticatorAppSecret: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthIdentityForgotPasswordValidateCodeUseCase,
        {
          provide: AuthIdentityQueryRepositoryGateway,
          useValue: authIdentityQueryRepository,
        },
        {
          provide: EmailForgotPasswordGateway,
          useValue: emailForgotPassword,
        },
      ],
    }).compile();

    useCase = module.get(AuthIdentityForgotPasswordValidateCodeUseCase);
    jest.clearAllMocks();
  });

  it('should return valid true when the code is correct', async () => {
    const dto = buildDto();
    const authIdentity = buildAuthIdentityQueryResult();

    authIdentityQueryRepository.findOneAuthIdentityByEmailOrFederalDocument.mockResolvedValueOnce(
      authIdentity,
    );
    emailForgotPassword.validateForgotPasswordCode.mockResolvedValueOnce(true);

    const result = await useCase.execute(dto);

    expect(result).toBeInstanceOf(AuthIdentityForgotPasswordCodeResponseDto);
    expect(result.valid).toBe(true);

    expect(
      authIdentityQueryRepository.findOneAuthIdentityByEmailOrFederalDocument,
    ).toHaveBeenCalledWith(dto.email);
    expect(emailForgotPassword.validateForgotPasswordCode).toHaveBeenCalledWith(
      authIdentity.id,
      dto.code,
    );
  });

  it('should return valid false when the code is incorrect', async () => {
    const dto = buildDto();
    const authIdentity = buildAuthIdentityQueryResult();

    authIdentityQueryRepository.findOneAuthIdentityByEmailOrFederalDocument.mockResolvedValueOnce(
      authIdentity,
    );
    emailForgotPassword.validateForgotPasswordCode.mockResolvedValueOnce(false);

    const result = await useCase.execute(dto);

    expect(result).toBeInstanceOf(AuthIdentityForgotPasswordCodeResponseDto);
    expect(result.valid).toBe(false);

    expect(
      authIdentityQueryRepository.findOneAuthIdentityByEmailOrFederalDocument,
    ).toHaveBeenCalledTimes(1);
    expect(
      emailForgotPassword.validateForgotPasswordCode,
    ).toHaveBeenCalledTimes(1);
  });

  it('should return valid false when the auth identity is not found', async () => {
    const dto = buildDto();

    authIdentityQueryRepository.findOneAuthIdentityByEmailOrFederalDocument.mockResolvedValueOnce(
      null,
    );

    const result = await useCase.execute(dto);

    expect(result).toBeInstanceOf(AuthIdentityForgotPasswordCodeResponseDto);
    expect(result.valid).toBe(false);

    expect(
      authIdentityQueryRepository.findOneAuthIdentityByEmailOrFederalDocument,
    ).toHaveBeenCalledTimes(1);
    expect(
      emailForgotPassword.validateForgotPasswordCode,
    ).not.toHaveBeenCalled();
  });
});
