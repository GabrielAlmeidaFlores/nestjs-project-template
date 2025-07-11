import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { UserSessionGateway } from '@lib/user-session/user-session.gateway';

import type { FastifyRequest } from 'fastify';

@Injectable()
export class CustomerAuthGuard implements CanActivate {
  protected readonly _type = CustomerAuthGuard.name;

  public constructor(private readonly userSessionGateway: UserSessionGateway) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const token = request.cookies['auth_token'];

    if (typeof token !== 'string' || token.trim() === '') {
      return false;
    }

    const customerSession =
      this.userSessionGateway.verifyCustomerSession(token);

    if (customerSession === null) {
      return false;
    }

    const sessionId = await this.userSessionGateway.getCustomerSession(
      new Guid(customerSession.customerId),
    );

    if (sessionId === null) {
      return false;
    }

    if (sessionId.toString() !== customerSession.sessionId) {
      return false;
    }

    return true;
  }
}
