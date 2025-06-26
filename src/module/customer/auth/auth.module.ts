import { Module } from '@nestjs/common';

import { BankModule } from '@infra/bank/bank.module';
import { DatabaseModule } from '@infra/database/database.module';
import { AuthController } from '@module/customer/auth/auth.controller';
import { SignUpUseCase } from '@module/customer/auth/use-case/sign-up.use-case';

@Module({
  imports: [DatabaseModule, BankModule],
  controllers: [AuthController],
  providers: [SignUpUseCase],
})
export class AuthModule {
  protected readonly _type = AuthModule.name;
}
