import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class ServiceDeskModule {
  protected readonly _type = ServiceDeskModule.name;
}
