import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { OrganizationCreditController } from '@module/customer/organization-credit/organization-credit.controller';
import { ConsumeOrganizationCreditUseCase } from '@module/customer/organization-credit/use-case/consume-organization-credit.use-case';
import { GetOrganizationAvailableCreditsUseCase } from '@module/customer/organization-credit/use-case/get-organization-available-credits.use-case';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    OrganizationSessionModule,
    PaymentPlanModule,
  ],
  controllers: [OrganizationCreditController],
  providers: [
    GetOrganizationAvailableCreditsUseCase,
    ConsumeOrganizationCreditUseCase,
    {
      provide: ConsumeOrganizationCreditUseCaseGateway,
      useClass: ConsumeOrganizationCreditUseCase,
    },
  ],
  exports: [ConsumeOrganizationCreditUseCaseGateway],
})
export class OrganizationCreditModule {
  protected readonly _type = OrganizationCreditModule.name;
}
