import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';import { UserSessionJwtInputModel } from '@lib/user-session/model/input/user-session-jwt.input.model';
import { UserSessionGateway } from '@lib/user-session/user-session.gateway';
import { UserDataInputModel } from '@shared/api/util/decorator/method/get-user-data/model/input/user-data.input.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { FastifyRequest } from 'fastify';

@Injectable()
export class UserAuthGuard implements CanActivate {
  protected readonly _type = UserAuthGuard.name;

  public constructor(private readonly userSessionGateway: UserSessionGateway) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const token = request.cookies['auth_token'];

    if (typeof token !== 'string' || token.trim() === '') {
      return false;
    }

    const userSession = this.userSessionGateway.verifySession(token);

    if (userSession === null) {
      return false;
    }

    if (userSession.userLevel === UserLevelEnum.CUSTOMER) {
      return this.handleCustomerSession(
        request,
        UserSessionJwtInputModel.build({
          ...userSession,
        }),
      );
    }

    return false;
  }

  private async handleCustomerSession(
    request: FastifyRequest,
    userSession: UserSessionJwtInputModel,
  ): Promise<boolean> {
    const sessionId = await this.userSessionGateway.getCustomerSession(
      new Guid(userSession.customerId),
    );

    if (sessionId === null) {
      return false;
    }

    if (sessionId.toString() !== userSession.sessionId) {
      return false;
    }

    const internalRequest = request as unknown as {
      userData: UserDataInputModel;
    };

    internalRequest.userData = UserDataInputModel.build({
      userId: new Guid(userSession.customerId),
      userLevel: userSession.userLevel,
    });

    return true;
  }
}
