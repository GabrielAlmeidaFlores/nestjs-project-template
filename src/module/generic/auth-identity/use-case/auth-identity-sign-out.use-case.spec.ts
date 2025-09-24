import { Test } from '@nestjs/testing';

import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { AuthIdentitySessionGateway } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.gateway';
import { AuthIdentitySignOutUseCase } from '@module/generic/auth-identity/use-case/auth-identity-sign-out.use-case';
import { ApiCookieEnum } from '@shared/api/enum/api-cookie.enum';

import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import type { FastifyReply } from 'fastify';

describe(AuthIdentitySignOutUseCase.name, () => {
  let useCase: AuthIdentitySignOutUseCase;

  const sessionGateway: jest.Mocked<AuthIdentitySessionGateway> = {
    createSession: jest.fn(),
    getSession: jest.fn(),
    deleteSession: jest.fn(),
  } as unknown as jest.Mocked<AuthIdentitySessionGateway>;

  const reply: Partial<FastifyReply> = {
    clearCookie: jest.fn(),
  };

  const sessionData: SessionDataModel = {
    authIdentityId: new AuthIdentityId(),
  } as SessionDataModel;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthIdentitySignOutUseCase,
        { provide: AuthIdentitySessionGateway, useValue: sessionGateway },
      ],
    }).compile();

    useCase = module.get(AuthIdentitySignOutUseCase);

    jest.clearAllMocks();
  });

  it('deletes session and clears the auth cookie', async () => {
    sessionGateway.deleteSession.mockResolvedValueOnce();

    await expect(
      useCase.execute(reply as FastifyReply, sessionData),
    ).resolves.toBeUndefined();

    expect(sessionGateway.deleteSession).toHaveBeenCalledTimes(1);
    expect(sessionGateway.deleteSession).toHaveBeenCalledWith(
      sessionData.authIdentityId,
    );

    expect(reply.clearCookie).toHaveBeenCalledTimes(1);
    expect(reply.clearCookie).toHaveBeenCalledWith(ApiCookieEnum.AUTH_TOKEN);
  });

  it('propagates errors from deleteSession and does NOT clear cookie', async () => {
    sessionGateway.deleteSession.mockRejectedValueOnce(
      new Error('boom on delete'),
    );

    await expect(
      useCase.execute(reply as FastifyReply, sessionData),
    ).rejects.toThrow('boom on delete');

    expect(reply.clearCookie).not.toHaveBeenCalled();
  });
});
