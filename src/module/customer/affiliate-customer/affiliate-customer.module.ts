import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AffiliateCustomerController } from '@module/customer/affiliate-customer/affiliate-customer.controller';
import { GetMyAffiliateCustomerUseCase } from '@module/customer/affiliate-customer/use-case/get-my-affiliate-customer.use-case';
import { GetPublicAffiliateCustomerUseCase } from '@module/customer/affiliate-customer/use-case/get-public-affiliate-customer.use-case';
import { UpdateMyAffiliatePixKeyUseCase } from '@module/customer/affiliate-customer/use-case/update-my-affiliate-pix-key.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [AffiliateCustomerController],
  providers: [
    GetPublicAffiliateCustomerUseCase,
    GetMyAffiliateCustomerUseCase,
    UpdateMyAffiliatePixKeyUseCase,
  ],
})
export class AffiliateCustomerModule {
  protected readonly _type = AffiliateCustomerModule.name;
}
