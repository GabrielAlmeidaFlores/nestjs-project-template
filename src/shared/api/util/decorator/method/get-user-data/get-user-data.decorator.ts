import { createParamDecorator } from '@nestjs/common';

import type { ExecutionContext } from '@nestjs/common';
import type { UserDataInputModel } from '@shared/api/util/decorator/method/get-user-data/model/input/user-data.input.model';
import type { FastifyRequest } from 'fastify';

export const GetUserData = createParamDecorator(
  (_: object, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const internalRequest = request as unknown as {
      userData: UserDataInputModel;
    };
    return internalRequest.userData;
  },
);
