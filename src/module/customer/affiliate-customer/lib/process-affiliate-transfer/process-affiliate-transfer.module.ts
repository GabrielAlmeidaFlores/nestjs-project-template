import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { PaymentGatewayModule } from '@infra/payment-gateway/payment-gateway.module';
import { ProcessAffiliateTransferGateway } from '@module/customer/affiliate-customer/lib/process-affiliate-transfer/process-affiliate-transfer.gateway';
import { ProcessAffiliateTransferService } from '@module/customer/affiliate-customer/lib/process-affiliate-transfer/process-affiliate-transfer.service';

@Module({
  imports: [DatabaseModule, PaymentGatewayModule],
  providers: [
    ProcessAffiliateTransferService,
    {
      provide: ProcessAffiliateTransferGateway,
      useClass: ProcessAffiliateTransferService,
    },
  ],
  exports: [ProcessAffiliateTransferGateway],
})
export class ProcessAffiliateTransferModule {
  protected readonly _type = ProcessAffiliateTransferModule.name;
}
