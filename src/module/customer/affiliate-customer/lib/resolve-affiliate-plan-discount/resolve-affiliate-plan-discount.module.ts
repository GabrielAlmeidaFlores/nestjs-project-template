import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { ResolveAffiliatePlanDiscountGateway } from '@module/customer/affiliate-customer/lib/resolve-affiliate-plan-discount/resolve-affiliate-plan-discount.gateway';
import { ResolveAffiliatePlanDiscountService } from '@module/customer/affiliate-customer/lib/resolve-affiliate-plan-discount/resolve-affiliate-plan-discount.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ResolveAffiliatePlanDiscountService,
    {
      provide: ResolveAffiliatePlanDiscountGateway,
      useClass: ResolveAffiliatePlanDiscountService,
    },
  ],
  exports: [ResolveAffiliatePlanDiscountGateway],
})
export class ResolveAffiliatePlanDiscountModule {
  protected readonly _type = ResolveAffiliatePlanDiscountModule.name;
}
