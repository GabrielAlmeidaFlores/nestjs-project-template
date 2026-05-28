import { Test, TestingModule } from '@nestjs/testing';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { GetAuthIdentityWithRelationsQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity-with-relations.query.result';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';
import { AuthIdentityForgotPasswordRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-forgot-password.request.dto';
import { WrongSignInCredentialsError } from '@module/generic/auth-identity/error/wrong-sign-in-credentials.error';
import { EmailForgotPasswordGateway } from '@module/generic/auth-identity/lib/email-forgot-password/email-forgot-password.gateway';

import { AuthIdentityForgotPasswordUseCase } from './auth-identity-forgot-password.use-case';

describe('AuthIdentityForgotPasswordUseCase', () => {
  let useCase: AuthIdentityForgotPasswordUseCase;
  let authIdentityQueryRepository: jest.Mocked<AuthIdentityQueryRepositoryGateway>;
  let emailForgotPasswordGateway: jest.Mocked<EmailForgotPasswordGateway>;

  const email = new Email('test@example.com');
  const now = new Date();
  const authIdentityId = new AuthIdentityId();

  const mockAuthIdentity = GetAuthIdentityWithRelationsQueryResult.build({
    id: authIdentityId,
    email,
    password: new HashedPassword('$2b$10$hashedpw'),
    isActive: true,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  });

  beforeEach(async () => {
    authIdentityQueryRepository = {
      findOneAuthIdentityById: jest.fn(),
      findOneAuthIdentityByEmail: jest.fn(),
      findOneAuthIdentityByEmailWithRelations: jest.fn(),
    } as unknown as jest.Mocked<AuthIdentityQueryRepositoryGateway>;

    emailForgotPasswordGateway = {
      generatePersistAndSendForgotPasswordCode: jest.fn().mockResolvedValue(undefined),
      validateForgotPasswordCode: jest.fn(),
      invalidateForgotPasswordCode: jest.fn(),
    } as unknown as jest.Mocked<EmailForgotPasswordGateway>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthIdentityForgotPasswordUseCase,
        { provide: AuthIdentityQueryRepositoryGateway, useValue: authIdentityQueryRepository },
        { provide: EmailForgotPasswordGateway, useValue: emailForgotPasswordGateway },
      ],
    }).compile();

    useCase = module.get(AuthIdentityForgotPasswordUseCase);
  });

  describe('execute', () => {
    it('should send a forgot-password code when the auth identity exists', async () => {
      authIdentityQueryRepository.findOneAuthIdentityByEmailWithRelations.mockResolvedValue(
        mockAuthIdentity,
      );
      const dto = AuthIdentityForgotPasswordRequestDto.build({ email });

      await useCase.execute(dto);

      expect(
        emailForgotPasswordGateway.generatePersistAndSendForgotPasswordCode,
      ).toHaveBeenCalledWith(authIdentityId, email.toString(), email);
    });

    it('should throw WrongSignInCredentialsError when the auth identity does not exist', async () => {
      authIdentityQueryRepository.findOneAuthIdentityByEmailWithRelations.mockResolvedValue(null);
      const dto = AuthIdentityForgotPasswordRequestDto.build({ email });

      await expect(useCase.execute(dto)).rejects.toThrow(WrongSignInCredentialsError);
    });
  });
});
