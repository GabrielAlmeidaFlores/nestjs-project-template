import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AccountController } from '@module/admin/account/account.controller';
import { GetAuthenticatedAdminDataUseCase } from '@module/admin/account/use-case/get-authenticated-admin-data.use-case';
import { UpdateAdminUseCase } from '@module/admin/account/use-case/update-admin.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [AccountController],
  providers: [GetAuthenticatedAdminDataUseCase, UpdateAdminUseCase],
})
export class AccountModule {
  protected readonly _type = AccountModule.name;
}
