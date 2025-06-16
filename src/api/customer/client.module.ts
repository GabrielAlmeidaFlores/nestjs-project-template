import { Module } from '@nestjs/common';

import { AuthModule } from '@base/api/customer/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class ClientModule {
  protected readonly _type = ClientModule.name;
}
