import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { BankController } from '@module/generic/bank/bank.controller';
import { ProcessAsaasWebhookPaymentEventUseCase } from '@module/generic/bank/use-case/process-asaas-webhook-payment-event.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [BankController],
  providers: [ProcessAsaasWebhookPaymentEventUseCase],
})
export class BankModule {
  protected readonly _type = BankModule.name;
}
