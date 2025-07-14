import { Test } from '@nestjs/testing';

import { LogoutUseCase } from '@module/generic/auth/use-case/logout.use-case';
import { NodeApplicationVariable } from '@shared/system/constant/application-variable/node.application-variable';

import type { FastifyReply } from 'fastify';

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;

  let reply: {
    clearCookie: jest.MockedFunction<FastifyReply['clearCookie']>;
  };

  beforeEach(async () => {
    reply = {
      clearCookie: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [LogoutUseCase],
    }).compile();

    useCase = module.get(LogoutUseCase);
  });

  it('should clear the auth_token cookie with correct options', () => {
    useCase.execute(reply as unknown as FastifyReply);

    expect(reply.clearCookie).toHaveBeenCalledWith('auth_token', {
      path: '/',
      secure: NodeApplicationVariable.PRODUCTION_ENVIRONMENT,
      sameSite: 'lax',
    });
  });
});
