import { Module } from '@nestjs/common';

import { AuthController } from '@base/api/customer/auth/auth.controller';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {
  protected readonly _type = AuthModule.name;
}
