import { Test, TestingModule } from '@nestjs/testing';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';
import { AuthIdentityForgotPasswordValidateCodeRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-forgot-password-code.request.dto';
import { EmailForgotPasswordGateway } from '@module/generic/auth-identity/lib/email-forgot-password/email-forgot-password.gateway';

import { AuthIdentityForgotPasswordValidateCodeUseCase } from './auth-identity-forgot-password-validate-code.use-case';

describe('AuthIdentityForgotPasswordValidateCodeUseCase', () => {
  let useCase: AuthIdentityForgotPasswordValidateCodeUseCase;
  let authIdentityQueryRepository: jest.Mocked<AuthIdentityQueryRepositoryGateway>;
  let emailForgotPasswordGateway: jest.Mocked<EmailForgotPasswordGateway>;

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
    authIdentityQueryRepository = {
      findOneAuthIdentityById: jest.fn(),
      findOneAuthIdentityByEmail: jest.fn(),
      findOneAuthIdentityByEmailWithRelations: jest.fn(),
    } as unknown as jest.Mocked<AuthIdentityQueryRepositoryGateway>;

    emailForgotPasswordGateway = {
      generatePersistAndSendForgotPasswordCode: jest.fn(),
      validateForgotPasswordCode: jest.fn(),
      invalidateForgotPasswordCode: jest.fn(),
    } as unknown as jest.Mocked<EmailForgotPasswordGateway>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthIdentityForgotPasswordValidateCodeUseCase,
        { provide: AuthIdentityQueryRepositoryGateway, useValue: authIdentityQueryRepository },
        { provide: EmailForgotPasswordGateway, useValue: emailForgotPasswordGateway },
      ],
    }).compile();

    useCase = module.get(AuthIdentityForgotPasswordValidateCodeUseCase);
  });

  describe('execute', () => {
    it('should return valid=false when the auth identity does not exist', async () => {
      authIdentityQueryRepository.findOneAuthIdentityByEmail.mockResolvedValue(null);
      const dto = AuthIdentityForgotPasswordValidateCodeRequestDto.build({ email, code: '123456' });

      const result = await useCase.execute(dto);

      expect(result.valid).toBe(false);
      expect(emailForgotPasswordGateway.validateForgotPasswordCode).not.toHaveBeenCalled();
    });

    it('should return valid=true when the code is correct', async () => {
      authIdentityQueryRepository.findOneAuthIdentityByEmail.mockResolvedValue(mockAuthIdentity);
      emailForgotPasswordGateway.validateForgotPasswordCode.mockResolvedValue(true);
      const dto = AuthIdentityForgotPasswordValidateCodeRequestDto.build({ email, code: '123456' });

      const result = await useCase.execute(dto);

      expect(result.valid).toBe(true);
      expect(emailForgotPasswordGateway.validateForgotPasswordCode).toHaveBeenCalledWith(
        authIdentityId,
        '123456',
      );
    });

    it('should return valid=false when the code is incorrect or expired', async () => {
      authIdentityQueryRepository.findOneAuthIdentityByEmail.mockResolvedValue(mockAuthIdentity);
      emailForgotPasswordGateway.validateForgotPasswordCode.mockResolvedValue(false);
      const dto = AuthIdentityForgotPasswordValidateCodeRequestDto.build({ email, code: 'wrong' });

      const result = await useCase.execute(dto);

      expect(result.valid).toBe(false);
    });
  });
});
