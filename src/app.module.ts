import { Module } from '@nestjs/common';

import { CustomerModule } from '@module/customer/customer.module';
import { GenericModule } from '@module/generic/generic.module';

@Module({
  imports: [GenericModule, CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  protected readonly _type = AppModule.name;
}
