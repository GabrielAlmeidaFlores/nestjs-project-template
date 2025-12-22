import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { PaymentGatewayApplicationVariable } from '@shared/system/constant/application-variable/source/payment-gateway.application-variable';

@Injectable()
export class AsaasWebhookGuard implements CanActivate {
  protected readonly _type = AsaasWebhookGuard.name;

  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const accessToken = request.headers['asaas-access-token'];

    if (typeof accessToken !== 'string' || accessToken.trim() === '') {
      return false;
    }

    const expectedToken =
      PaymentGatewayApplicationVariable.BANK_WEBHOOK_ENDPOINT_ACCESS_TOKEN;

    return accessToken === expectedToken;
  }
}
