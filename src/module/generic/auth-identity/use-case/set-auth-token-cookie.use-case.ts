import { Injectable, Inject } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { AuthIdentitySessionGateway } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.gateway';
import { SetAuthTokenCookieUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/set-auth-token-cookie.use-case-gateway';
import { ApiCookieEnum } from '@shared/api/enum/api-cookie.enum';
import { FrameworkApplicationVariable } from '@shared/system/constant/application-variable/source/framework.application-variable';

import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@Injectable()
export class SetAuthTokenCookieUseCase implements SetAuthTokenCookieUseCaseGateway {
  protected readonly _type = SetAuthTokenCookieUseCase.name;

  public constructor(
    @Inject(AuthIdentitySessionGateway)
    private readonly authIdentitySessionGateway: AuthIdentitySessionGateway,
  ) {}

  public async execute(
    reply: FastifyReply,
    authIdentityId: AuthIdentityId,
    userLevel: UserLevelEnum,
  ): Promise<void> {
    reply.clearCookie(ApiCookieEnum.AUTH_TOKEN);
    reply.clearCookie(ApiCookieEnum.ORGANIZATION);

    const jwtSession = await this.authIdentitySessionGateway.createSession(
      authIdentityId,
      userLevel,
    );
    reply.setCookie(ApiCookieEnum.AUTH_TOKEN, jwtSession, {
      httpOnly: FrameworkApplicationVariable.FRAMEWORK_COOKIES_CONFIG_HTTP_ONLY,
      secure: FrameworkApplicationVariable.FRAMEWORK_COOKIES_CONFIG_SECURE,
      sameSite: FrameworkApplicationVariable.FRAMEWORK_COOKIES_CONFIG_SAME_SITE,
      maxAge: FrameworkApplicationVariable.FRAMEWORK_COOKIES_CONFIG_MAX_AGE,
      path: '/',
    });
  }
}
