import { Injectable, Inject } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { AuthIdentitySessionGateway } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.gateway';
import { SetAuthTokenCookieUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/set-auth-token-cookie.use-case-gateway';
import { ApiCookieEnum } from '@shared/api/enum/api-cookie.enum';

import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@Injectable()
export class SetAuthTokenCookieUseCase implements SetAuthTokenCookieUseCaseGateway {
  protected readonly _type = SetAuthTokenCookieUseCase.name;
  private readonly sevenDaysInSeconds: number;

  public constructor(
    @Inject(AuthIdentitySessionGateway)
    private readonly authIdentitySessionGateway: AuthIdentitySessionGateway,
  ) {
    this.sevenDaysInSeconds = 604800;
  }

  public async execute(
    reply: FastifyReply,
    authIdentityId: AuthIdentityId,
    userLevel: UserLevelEnum,
  ): Promise<void> {
    const jwtSession = await this.authIdentitySessionGateway.createSession(
      authIdentityId,
      userLevel,
    );
    reply.setCookie(ApiCookieEnum.AUTH_TOKEN, jwtSession, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: this.sevenDaysInSeconds,
    });
  }
}
