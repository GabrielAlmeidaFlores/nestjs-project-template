import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { PaymentGatewayModule } from '@infra/payment-gateway/payment-gateway.module';
import { CreditPackController } from '@module/customer/credit-pack/credit-pack.controller';
import { ListCreditPacksUseCase } from '@module/customer/credit-pack/use-case/list-credit-packs.use-case';
import { PayCreditPackBillingUseCase } from '@module/customer/credit-pack/use-case/pay-credit-pack-billing.use-case';
import { PurchaseCreditPackUseCase } from '@module/customer/credit-pack/use-case/purchase-credit-pack.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    OrganizationSessionModule,
    PaymentGatewayModule,
  ],
  controllers: [CreditPackController],
  providers: [
    ListCreditPacksUseCase,
    PurchaseCreditPackUseCase,
    PayCreditPackBillingUseCase,
  ],
})
export class CreditPackModule {
  protected readonly _type = CreditPackModule.name;
}
