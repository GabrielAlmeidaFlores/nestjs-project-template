import { Test, TestingModule } from '@nestjs/testing';
import bcrypt from 'bcrypt';
import { FastifyReply } from 'fastify';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { GetAuthIdentityWithRelationsQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity-with-relations.query.result';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';
import { AuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-sign-in.request.dto';
import { AccountDeactivatedError } from '@module/generic/auth-identity/error/account-deactivated.error';
import { WrongSignInCredentialsError } from '@module/generic/auth-identity/error/wrong-sign-in-credentials.error';
import { SetAuthTokenCookieUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/set-auth-token-cookie.use-case-gateway';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import { AuthIdentitySignInUseCase } from './auth-identity-sign-in.use-case';

jest.mock('bcrypt');

describe('AuthIdentitySignInUseCase', () => {
  let useCase: AuthIdentitySignInUseCase;
  let authIdentityQueryRepository: jest.Mocked<AuthIdentityQueryRepositoryGateway>;
  let setAuthTokenCookieGateway: jest.Mocked<SetAuthTokenCookieUseCaseGateway>;

  const email = new Email('test@example.com');
  const now = new Date();
  const authIdentityId = new AuthIdentityId();

  const mockReply = {
    setCookie: jest.fn(),
  } as unknown as FastifyReply;

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

    setAuthTokenCookieGateway = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<SetAuthTokenCookieUseCaseGateway>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthIdentitySignInUseCase,
        { provide: AuthIdentityQueryRepositoryGateway, useValue: authIdentityQueryRepository },
        { provide: SetAuthTokenCookieUseCaseGateway, useValue: setAuthTokenCookieGateway },
      ],
    }).compile();

    useCase = module.get(AuthIdentitySignInUseCase);
  });

  describe('execute', () => {
    it('should sign in and set the auth cookie when credentials are correct', async () => {
      authIdentityQueryRepository.findOneAuthIdentityByEmailWithRelations.mockResolvedValue(
        mockActiveAuthIdentity,
      );
      (bcrypt.compareSync as jest.Mock).mockReturnValue(true);
      const dto = AuthIdentitySignInRequestDto.build({ email, password: 'correctpass' });

      const result = await useCase.execute(mockReply, dto);

      expect(result.userLevel).toBe(UserLevelEnum.USER);
      expect(setAuthTokenCookieGateway.execute).toHaveBeenCalledWith(
        mockReply,
        authIdentityId,
        UserLevelEnum.USER,
      );
    });

    it('should throw WrongSignInCredentialsError when auth identity does not exist', async () => {
      authIdentityQueryRepository.findOneAuthIdentityByEmailWithRelations.mockResolvedValue(null);
      const dto = AuthIdentitySignInRequestDto.build({ email, password: 'anypass' });

      await expect(useCase.execute(mockReply, dto)).rejects.toThrow(WrongSignInCredentialsError);
    });

    it('should throw AccountDeactivatedError when the account is inactive', async () => {
      authIdentityQueryRepository.findOneAuthIdentityByEmailWithRelations.mockResolvedValue(
        mockInactiveAuthIdentity,
      );
      const dto = AuthIdentitySignInRequestDto.build({ email, password: 'anypass' });

      await expect(useCase.execute(mockReply, dto)).rejects.toThrow(AccountDeactivatedError);
    });

    it('should throw WrongSignInCredentialsError when the password is wrong', async () => {
      authIdentityQueryRepository.findOneAuthIdentityByEmailWithRelations.mockResolvedValue(
        mockActiveAuthIdentity,
      );
      (bcrypt.compareSync as jest.Mock).mockReturnValue(false);
      const dto = AuthIdentitySignInRequestDto.build({ email, password: 'wrongpass' });

      await expect(useCase.execute(mockReply, dto)).rejects.toThrow(WrongSignInCredentialsError);
    });
  });
});
