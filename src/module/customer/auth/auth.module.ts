import { Module } from '@nestjs/common';

import { BankModule } from '@infra/bank/bank.module';
import { DatabaseModule } from '@infra/database/database.module';
import { UserSessionModule } from '@lib/user-session/user-session.module';
import { AuthController } from '@module/customer/auth/auth.controller';
import { LoginUseCase } from '@module/customer/auth/use-case/login.use-case';
import { LogoutUseCase } from '@module/customer/auth/use-case/logout.use-case';
import { SignUpUseCase } from '@module/customer/auth/use-case/sign-up.use-case';

@Module({
  imports: [DatabaseModule, BankModule, UserSessionModule],
  controllers: [AuthController],
  providers: [SignUpUseCase, LoginUseCase, LogoutUseCase],
})
export class AuthModule {
  protected readonly _type = AuthModule.name;
}
