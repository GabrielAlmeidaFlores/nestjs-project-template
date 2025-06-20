import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AsaasService } from '@infra/bank/implementation/asaas/asaas.service';

@Module({
  imports: [HttpModule],
  providers: [AsaasService],
})
export class BankModule {
  protected readonly _type = BankModule.name;
}
