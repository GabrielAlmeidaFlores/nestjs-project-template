import { Test, TestingModule } from '@nestjs/testing';
import bcrypt from 'bcrypt';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { GetAuthIdentityWithRelationsQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity-with-relations.query.result';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';
import { PreAuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/pre-auth-identity-sign-in.request.dto';
import { AccountDeactivatedError } from '@module/generic/auth-identity/error/account-deactivated.error';
import { WrongSignInCredentialsError } from '@module/generic/auth-identity/error/wrong-sign-in-credentials.error';
import { EmailMFAGateway } from '@module/generic/auth-identity/lib/email-mfa/email-mfa.gateway';

import { PreAuthIdentitySignInUseCase } from './pre-auth-identity-sign-in.use-case';

jest.mock('bcrypt');

describe('PreAuthIdentitySignInUseCase', () => {
  let useCase: PreAuthIdentitySignInUseCase;
  let authIdentityQueryRepository: jest.Mocked<AuthIdentityQueryRepositoryGateway>;
  let emailMFAGateway: jest.Mocked<EmailMFAGateway>;

  const email = new Email('test@example.com');
  const now = new Date();
  const authIdentityId = new AuthIdentityId();

  const mockActiveAuthIdentity = GetAuthIdentityWithRelationsQueryResult.build({
    id: authIdentityId,
    email,
    password: new HashedPassword('$2b$10$hashedpw'),
    isActive: true,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  });

  const mockInactiveAuthIdentity = GetAuthIdentityWithRelationsQueryResult.build({
    id: authIdentityId,
    email,
    password: new HashedPassword('$2b$10$hashedpw'),
    isActive: false,
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

    emailMFAGateway = {
      generatePersistAndSendSignInCode: jest.fn().mockResolvedValue(undefined),
      validateSignInCode: jest.fn(),
    } as unknown as jest.Mocked<EmailMFAGateway>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PreAuthIdentitySignInUseCase,
        { provide: AuthIdentityQueryRepositoryGateway, useValue: authIdentityQueryRepository },
        { provide: EmailMFAGateway, useValue: emailMFAGateway },
      ],
    }).compile();

    useCase = module.get(PreAuthIdentitySignInUseCase);
  });

  describe('execute', () => {
    it('should send a sign-in code when credentials are correct', async () => {
      authIdentityQueryRepository.findOneAuthIdentityByEmailWithRelations.mockResolvedValue(
        mockActiveAuthIdentity,
      );
      (bcrypt.compareSync as jest.Mock).mockReturnValue(true);
      const dto = PreAuthIdentitySignInRequestDto.build({ email, password: 'correctpass' });

      await useCase.execute(dto);

      expect(emailMFAGateway.generatePersistAndSendSignInCode).toHaveBeenCalledWith(
        authIdentityId,
        email.toString(),
        email,
      );
    });

    it('should throw WrongSignInCredentialsError when auth identity does not exist', async () => {
      authIdentityQueryRepository.findOneAuthIdentityByEmailWithRelations.mockResolvedValue(null);
      const dto = PreAuthIdentitySignInRequestDto.build({ email, password: 'anypass' });

      await expect(useCase.execute(dto)).rejects.toThrow(WrongSignInCredentialsError);
    });

    it('should throw AccountDeactivatedError when the account is inactive', async () => {
      authIdentityQueryRepository.findOneAuthIdentityByEmailWithRelations.mockResolvedValue(
        mockInactiveAuthIdentity,
      );
      const dto = PreAuthIdentitySignInRequestDto.build({ email, password: 'anypass' });

      await expect(useCase.execute(dto)).rejects.toThrow(AccountDeactivatedError);
    });

    it('should throw WrongSignInCredentialsError when the password is wrong', async () => {
      authIdentityQueryRepository.findOneAuthIdentityByEmailWithRelations.mockResolvedValue(
        mockActiveAuthIdentity,
      );
      (bcrypt.compareSync as jest.Mock).mockReturnValue(false);
      const dto = PreAuthIdentitySignInRequestDto.build({ email, password: 'wrongpass' });

      await expect(useCase.execute(dto)).rejects.toThrow(WrongSignInCredentialsError);
    });
  });
});
