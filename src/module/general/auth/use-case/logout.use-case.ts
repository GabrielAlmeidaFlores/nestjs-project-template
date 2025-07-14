import { Injectable } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { NodeApplicationVariable } from '@shared/system/constant/application-variable/node.application-variable';

@Injectable()
export class LogoutUseCase {
  protected readonly _type = LogoutUseCase.name;

  public execute(reply: FastifyReply): void {
    reply.clearCookie('auth_token', {
      path: '/',
      secure: NodeApplicationVariable.PRODUCTION_ENVIRONMENT,
      sameSite: 'lax',
    });
  }
}
