import { Injectable, Inject } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { OrganizationSessionGateway } from '@module/customer/account/lib/organization-session/organization-session.gateway';
import { SetOrganizationCookieUseCaseGateway } from '@module/customer/account/use-case-gateway/set-organization-cookie.use-case-gateway';
import { ApiCookieEnum } from '@shared/api/enum/api-cookie.enum';

import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';

@Injectable()
export class SetOrganizationCookieUseCase implements SetOrganizationCookieUseCaseGateway {
  protected readonly _type = SetOrganizationCookieUseCase.name;
  private readonly sevenDaysInSeconds: number;

  public constructor(
    @Inject(OrganizationSessionGateway)
    private readonly organizationSessionGateway: OrganizationSessionGateway,
  ) {
    this.sevenDaysInSeconds = 604800;
  }

  public execute(
    reply: FastifyReply,
    organizationId: OrganizationId,
    owner: boolean,
  ): void {
    const jwtOrganizationSession =
      this.organizationSessionGateway.createSession(organizationId, owner);
    reply.setCookie(ApiCookieEnum.ORGANIZATION, jwtOrganizationSession, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: this.sevenDaysInSeconds,
    });
  }
}
