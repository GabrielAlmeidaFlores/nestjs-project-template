import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AuthController } from '@module/customer/auth/auth.controller';
import { SignUpUseCase } from '@module/customer/auth/use-case/signup.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [SignUpUseCase],
})
export class AuthModule {
  protected readonly _type = AuthModule.name;
}
