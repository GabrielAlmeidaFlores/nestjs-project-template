import { Test, TestingModule } from '@nestjs/testing';
import { FastifyReply } from 'fastify';

import { AuthIdentitySessionGateway } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.gateway';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import { SetAuthTokenCookieUseCase } from './set-auth-token-cookie.use-case';

describe('SetAuthTokenCookieUseCase', () => {
  let useCase: SetAuthTokenCookieUseCase;
  let authIdentitySessionGateway: jest.Mocked<AuthIdentitySessionGateway>;

  const authIdentityId = new AuthIdentityId();

  const mockReply = {
    setCookie: jest.fn(),
  } as unknown as FastifyReply;

  beforeEach(async () => {
    authIdentitySessionGateway = {
      createSession: jest.fn().mockResolvedValue('signed.jwt.token'),
      getSessionDataFromJwt: jest.fn(),
      deleteSession: jest.fn(),
      getSession: jest.fn(),
    } as unknown as jest.Mocked<AuthIdentitySessionGateway>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SetAuthTokenCookieUseCase,
        { provide: AuthIdentitySessionGateway, useValue: authIdentitySessionGateway },
      ],
    }).compile();

    useCase = module.get(SetAuthTokenCookieUseCase);

    (mockReply.setCookie as jest.Mock).mockClear();
  });

  describe('execute', () => {
    it('should create a session and set the auth token cookie', async () => {
      await useCase.execute(mockReply, authIdentityId, UserLevelEnum.USER);

      expect(authIdentitySessionGateway.createSession).toHaveBeenCalledWith(
        authIdentityId,
        UserLevelEnum.USER,
      );
      expect(mockReply.setCookie).toHaveBeenCalledTimes(1);
    });
  });
});
