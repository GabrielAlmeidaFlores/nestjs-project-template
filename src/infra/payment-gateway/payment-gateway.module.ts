import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AsaasModule } from '@infra/payment-gateway/implementation/asaas/asaas.module';
import { AsaasService } from '@infra/payment-gateway/implementation/asaas/asaas.service';
import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';

@Module({
  imports: [HttpModule, AsaasModule],
  providers: [
    {
      provide: PaymentGateway,
      useClass: AsaasService,
    },
    AsaasService,
  ],
  exports: [PaymentGateway],
})
export class PaymentGatewayModule {
  protected readonly _type = PaymentGatewayModule.name;
}
