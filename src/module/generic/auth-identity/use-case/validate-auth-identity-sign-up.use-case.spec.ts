import { Test, TestingModule } from '@nestjs/testing';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';
import { ValidateAuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/validate-auth-identity-sign-up.request.dto';
import { EmailAlreadyInUseError } from '@module/generic/auth-identity/error/email-already-in-use.error';

import { ValidateAuthIdentitySignUpUseCase } from './validate-auth-identity-sign-up.use-case';

describe('ValidateAuthIdentitySignUpUseCase', () => {
  let useCase: ValidateAuthIdentitySignUpUseCase;
  let authIdentityQueryRepository: jest.Mocked<AuthIdentityQueryRepositoryGateway>;

  const email = new Email('test@example.com');
  const now = new Date();

  const mockAuthIdentity = GetAuthIdentityQueryResult.build({
    id: new AuthIdentityId(),
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

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateAuthIdentitySignUpUseCase,
        { provide: AuthIdentityQueryRepositoryGateway, useValue: authIdentityQueryRepository },
      ],
    }).compile();

    useCase = module.get(ValidateAuthIdentitySignUpUseCase);
  });

  describe('execute', () => {
    it('should resolve without error when the email is not in use', async () => {
      authIdentityQueryRepository.findOneAuthIdentityByEmail.mockResolvedValue(null);
      const dto = ValidateAuthIdentitySignUpRequestDto.build({ email });

      await expect(useCase.execute(dto)).resolves.toBeUndefined();
      expect(authIdentityQueryRepository.findOneAuthIdentityByEmail).toHaveBeenCalledWith(email);
    });

    it('should throw EmailAlreadyInUseError when the email is already registered', async () => {
      authIdentityQueryRepository.findOneAuthIdentityByEmail.mockResolvedValue(mockAuthIdentity);
      const dto = ValidateAuthIdentitySignUpRequestDto.build({ email });

      await expect(useCase.execute(dto)).rejects.toThrow(EmailAlreadyInUseError);
    });
  });
});
