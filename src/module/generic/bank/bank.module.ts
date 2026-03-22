import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { ProcessAffiliateTransferModule } from '@module/customer/affiliate-customer/lib/process-affiliate-transfer/process-affiliate-transfer.module';
import { BankController } from '@module/generic/bank/bank.controller';
import { ProcessAsaasWebhookPaymentEventUseCase } from '@module/generic/bank/use-case/process-asaas-webhook-payment-event.use-case';
import { ProcessAsaasWebhookTransferAuthorizationUseCase } from '@module/generic/bank/use-case/process-asaas-webhook-transfer-authorization.use-case';

@Module({
  imports: [DatabaseModule, ProcessAffiliateTransferModule],
  controllers: [BankController],
  providers: [
    ProcessAsaasWebhookPaymentEventUseCase,
    ProcessAsaasWebhookTransferAuthorizationUseCase,
  ],
})
export class BankModule {
  protected readonly _type = BankModule.name;
}
