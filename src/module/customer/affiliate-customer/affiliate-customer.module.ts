import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AffiliateCustomerController } from '@module/customer/affiliate-customer/affiliate-customer.controller';
import { GetMyAffiliateCustomerSummaryUseCase } from '@module/customer/affiliate-customer/use-case/get-my-affiliate-customer-summary.use-case';
import { GetMyAffiliateCustomerUseCase } from '@module/customer/affiliate-customer/use-case/get-my-affiliate-customer.use-case';
import { GetPublicAffiliateCustomerUseCase } from '@module/customer/affiliate-customer/use-case/get-public-affiliate-customer.use-case';
import { ListMyAffiliateCommissionsUseCase } from '@module/customer/affiliate-customer/use-case/list-my-affiliate-commissions.use-case';
import { ListMyAffiliateTransfersUseCase } from '@module/customer/affiliate-customer/use-case/list-my-affiliate-transfers.use-case';
import { UpdateMyAffiliatePixKeyUseCase } from '@module/customer/affiliate-customer/use-case/update-my-affiliate-pix-key.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [AffiliateCustomerController],
  providers: [
    GetPublicAffiliateCustomerUseCase,
    GetMyAffiliateCustomerUseCase,
    GetMyAffiliateCustomerSummaryUseCase,
    UpdateMyAffiliatePixKeyUseCase,
    ListMyAffiliateCommissionsUseCase,
    ListMyAffiliateTransfersUseCase,
  ],
})
export class AffiliateCustomerModule {
  protected readonly _type = AffiliateCustomerModule.name;
}
