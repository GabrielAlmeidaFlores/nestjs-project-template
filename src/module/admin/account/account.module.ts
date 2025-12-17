import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AccountController } from '@module/admin/account/account.controller';
import { GetAuthenticatedAdminDataUseCase } from '@module/admin/account/use-case/get-authenticated-admin-data.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [AccountController],
  providers: [GetAuthenticatedAdminDataUseCase],
})
export class AccountModule {
  protected readonly _type = AccountModule.name;
}
