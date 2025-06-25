import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { BankGateway } from '@infra/bank/bank.gateway';
import { AsaasService } from '@infra/bank/implementation/asaas/asaas.service';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: BankGateway,
      useClass: AsaasService,
    },
    AsaasService,
  ],
  exports: [BankGateway],
})
export class BankModule {
  protected readonly _type = BankModule.name;
}
