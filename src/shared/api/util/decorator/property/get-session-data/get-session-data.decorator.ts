import { createParamDecorator } from '@nestjs/common';

import type { ExecutionContext } from '@nestjs/common';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.output.model';
import type { FastifyRequest } from 'fastify';

export const GetSessionData = createParamDecorator(
  (_: object, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const internalRequest = request as unknown as {
      sessionData: SessionDataModel;
    };

    return internalRequest.sessionData;
  },
);
