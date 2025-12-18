import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { OrganizationCreditController } from '@module/customer/organization-credit/organization-credit.controller';
import { GetOrganizationAvailableCreditsUseCase } from '@module/customer/organization-credit/use-case/get-organization-available-credits.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [AuthModule, DatabaseModule, OrganizationSessionModule],
  controllers: [OrganizationCreditController],
  providers: [GetOrganizationAvailableCreditsUseCase],
})
export class OrganizationCreditModule {
  protected readonly _type = OrganizationCreditModule.name;
}
