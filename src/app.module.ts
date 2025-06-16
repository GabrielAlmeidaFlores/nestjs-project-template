import { Module } from '@nestjs/common';

import { ClientModule } from '@base/api/customer/client.module';

@Module({
  imports: [ClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  protected readonly _type = AppModule.name;
}
