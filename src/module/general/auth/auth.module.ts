import { Module } from '@nestjs/common';

import { BankModule } from '@infra/bank/bank.module';
import { DatabaseModule } from '@infra/database/database.module';
import { UserSessionModule } from '@lib/user-session/user-session.module';
import { AuthController } from '@module/general/auth/auth.controller';
import { CustomerSignUpUseCase } from '@module/general/auth/use-case/customer-sign-up.use-case';
import { LoginUseCase } from '@module/general/auth/use-case/login.use-case';
import { LogoutUseCase } from '@module/general/auth/use-case/logout.use-case';

@Module({
  imports: [DatabaseModule, BankModule, UserSessionModule],
  controllers: [AuthController],
  providers: [CustomerSignUpUseCase, LoginUseCase, LogoutUseCase],
})
export class AuthModule {
  protected readonly _type = AuthModule.name;
}
