import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AuthController } from '@module/customer/auth/auth.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {
  protected readonly _type = AuthModule.name;
}
