import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { DatabaseModule } from '@infra/database/database.module';
import { CustomerTutorialController } from '@module/customer/tutorial/tutorial.controller';
import { ListTutorialsUseCase } from '@module/customer/tutorial/use-case/list-tutorials.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule, BucketModule],
  controllers: [CustomerTutorialController],
  providers: [ListTutorialsUseCase],
})
export class CustomerTutorialModule {
  protected readonly _type = CustomerTutorialModule.name;
}
