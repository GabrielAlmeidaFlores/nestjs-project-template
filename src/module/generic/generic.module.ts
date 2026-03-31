import { Module } from '@nestjs/common';

import { AuthIdentityModule } from '@module/generic/auth-identity/auth-identity.module';
import { BankModule } from '@module/generic/bank/bank.module';
import { GenericServiceDeskModule } from '@module/generic/service-desk/generic-service-desk.module';

@Module({
  imports: [AuthIdentityModule, BankModule, GenericServiceDeskModule],
  controllers: [],
  providers: [],
})
export class GenericModule {
  protected readonly _type = GenericModule.name;
}
