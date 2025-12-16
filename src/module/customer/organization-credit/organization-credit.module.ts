import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { PaymentPlanController } from '@module/customer/payment-plan/payment-plan.controller';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [AuthModule, DatabaseModule, OrganizationSessionModule],
  controllers: [PaymentPlanController],
  providers: [],
})
export class OrganizationCreditModule {
  protected readonly _type = OrganizationCreditModule.name;
}
