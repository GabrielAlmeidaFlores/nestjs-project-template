import { createParamDecorator } from '@nestjs/common';

import type { ExecutionContext } from '@nestjs/common';
import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import type { FastifyRequest } from 'fastify';

export const GetOrganizationSessionData = createParamDecorator(
  (_: object, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const internalRequest = request as unknown as {
      organizationSessionData: OrganizationSessionDataModel;
    };
    return internalRequest.organizationSessionData;
  },
);
