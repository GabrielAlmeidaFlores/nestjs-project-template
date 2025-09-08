import { Module } from '@nestjs/common';

import { CustomerModule } from '@module/customer/customer.module';

@Module({
  imports: [CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  protected readonly _type = AppModule.name;
}
