import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { OrganizationOwnerRequiredError } from '@shared/api/gateway/guard/organization-owner/error/organization-owner-required.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class OrganizationOwnerGuard implements CanActivate {
  protected readonly _type = OrganizationOwnerGuard.name;

  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const internalRequest = request as unknown as {
      organizationSessionData?: OrganizationSessionDataModel;
    };

    const organizationSessionData = internalRequest.organizationSessionData;

    if (!organizationSessionData) {
      throw new OrganizationOwnerRequiredError();
    }

    if (!organizationSessionData.owner) {
      throw new OrganizationOwnerRequiredError();
    }

    return true;
  }
}
