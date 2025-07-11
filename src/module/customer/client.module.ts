import { Module } from '@nestjs/common';

import { AuthModule } from '@module/customer/auth/auth.module';
import { CustomerAuthModule } from '@shared/api/gateway/guard/customer-auth/customer-auth.module';

@Module({
  imports: [CustomerAuthModule, AuthModule],
  controllers: [],
  providers: [],
})
export class ClientModule {
  protected readonly _type = ClientModule.name;
}
