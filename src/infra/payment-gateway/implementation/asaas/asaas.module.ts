import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AsaasService } from '@infra/payment-gateway/implementation/asaas/asaas.service';

@Module({
  imports: [HttpModule],
  providers: [AsaasService],
  exports: [AsaasService],
})
export class AsaasModule {
  protected readonly _type = AsaasModule.name;
}
