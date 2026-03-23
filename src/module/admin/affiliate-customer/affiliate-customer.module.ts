import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AffiliateCustomerController } from '@module/admin/affiliate-customer/affiliate-customer.controller';
import { CreateAffiliateCustomerUseCase } from '@module/admin/affiliate-customer/use-case/create-affiliate-customer.use-case';
import { DeleteAffiliateCustomerUseCase } from '@module/admin/affiliate-customer/use-case/delete-affiliate-customer.use-case';
import { GetAffiliateCustomerUseCase } from '@module/admin/affiliate-customer/use-case/get-affiliate-customer.use-case';
import { ListAffiliateCustomersUseCase } from '@module/admin/affiliate-customer/use-case/list-affiliate-customers.use-case';
import { ListAffiliateTransfersUseCase } from '@module/admin/affiliate-customer/use-case/list-affiliate-transfers.use-case';
import { UpdateAffiliateCustomerUseCase } from '@module/admin/affiliate-customer/use-case/update-affiliate-customer.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [AffiliateCustomerController],
  providers: [
    CreateAffiliateCustomerUseCase,
    ListAffiliateCustomersUseCase,
    GetAffiliateCustomerUseCase,
    UpdateAffiliateCustomerUseCase,
    DeleteAffiliateCustomerUseCase,
    ListAffiliateTransfersUseCase,
  ],
})
export class AffiliateCustomerAdminModule {
  protected readonly _type = AffiliateCustomerAdminModule.name;
}
