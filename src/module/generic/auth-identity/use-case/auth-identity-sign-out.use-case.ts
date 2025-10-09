import { Inject, Injectable } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { AuthIdentitySessionGateway } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.gateway';
import { ApiCookieEnum } from '@shared/api/enum/api-cookie.enum';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AuthIdentitySignOutUseCase {
  protected readonly _type = AuthIdentitySignOutUseCase.name;

  public constructor(
    @Inject(AuthIdentitySessionGateway)
    private readonly authIdentitySessionGateway: AuthIdentitySessionGateway,
  ) {}

  public async execute(
    reply: FastifyReply,
    sessionData: SessionDataModel,
  ): Promise<void> {
    await this.authIdentitySessionGateway.deleteSession(
      sessionData.authIdentityId,
    );

    reply.clearCookie(ApiCookieEnum.AUTH_TOKEN);
    reply.clearCookie(ApiCookieEnum.ORGANIZATION);
  }
}
