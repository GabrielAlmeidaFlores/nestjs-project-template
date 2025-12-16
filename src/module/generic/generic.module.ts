import { Module } from '@nestjs/common';

import { AuthIdentityModule } from '@module/generic/auth-identity/auth-identity.module';
import { BankModule } from '@module/generic/bank/bank.module';

@Module({
  imports: [AuthIdentityModule, BankModule],
  controllers: [],
  providers: [],
})
export class GenericModule {
  protected readonly _type = GenericModule.name;
}
