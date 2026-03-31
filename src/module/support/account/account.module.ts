import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AccountController } from '@module/support/account/account.controller';
import { GetAuthenticatedSupportDataUseCase } from '@module/support/account/use-case/get-authenticated-support-data.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [AccountController],
  providers: [GetAuthenticatedSupportDataUseCase],
})
export class AccountModule {
  protected readonly _type = AccountModule.name;
}
