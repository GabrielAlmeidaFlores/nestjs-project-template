import { Injectable, Inject } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { OrganizationSessionGateway } from '@module/customer/account/lib/organization-session/organization-session.gateway';
import { SetOrganizationCookieUseCaseGateway } from '@module/customer/account/use-case-gateway/set-organization-cookie.use-case-gateway';
import { ApiCookieEnum } from '@shared/api/enum/api-cookie.enum';
import { FrameworkApplicationVariable } from '@shared/system/constant/application-variable/source/framework.application-variable';

import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';

@Injectable()
export class SetOrganizationCookieUseCase implements SetOrganizationCookieUseCaseGateway {
  protected readonly _type = SetOrganizationCookieUseCase.name;

  public constructor(
    @Inject(OrganizationSessionGateway)
    private readonly organizationSessionGateway: OrganizationSessionGateway,
  ) {}

  public execute(
    reply: FastifyReply,
    organizationId: OrganizationId,
    owner: boolean,
  ): void {
    const jwtOrganizationSession =
      this.organizationSessionGateway.createSession(organizationId, owner);
    reply.setCookie(ApiCookieEnum.ORGANIZATION, jwtOrganizationSession, {
      httpOnly: FrameworkApplicationVariable.FRAMEWORK_COOKIES_CONFIG_HTTP_ONLY,
      secure: FrameworkApplicationVariable.FRAMEWORK_COOKIES_CONFIG_SECURE,
      sameSite: FrameworkApplicationVariable.FRAMEWORK_COOKIES_CONFIG_SAME_SITE,
      maxAge: FrameworkApplicationVariable.FRAMEWORK_COOKIES_CONFIG_MAX_AGE,
      path: '/',
    });
  }
}
