import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AffiliateCustomerController } from '@module/customer/affiliate-customer/affiliate-customer.controller';
import { GetPublicAffiliateCustomerUseCase } from '@module/customer/affiliate-customer/use-case/get-public-affiliate-customer.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [AffiliateCustomerController],
  providers: [GetPublicAffiliateCustomerUseCase],
})
export class AffiliateCustomerModule {
  protected readonly _type = AffiliateCustomerModule.name;
}
