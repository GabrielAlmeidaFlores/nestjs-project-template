import { Module } from '@nestjs/common';

import { SignUpUseCase } from '@api/customer/auth/use-case/signup.use-case';
import { AuthController } from '@base/api/customer/auth/auth.controller';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [SignUpUseCase],
})
export class AuthModule {
  protected readonly _type = AuthModule.name;
}
