import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { DatabaseModule } from '@infra/database/database.module';
import { AccountController } from '@module/customer/account/account.controller';
import { CustomerSignUpUseCase } from '@module/customer/account/use-case/customer-sign-up.use-case';
import { UpdateCustomerProfilePictureUseCase } from '@module/customer/account/use-case/update-customer-profile-picture.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule, BucketModule],
  controllers: [AccountController],
  providers: [CustomerSignUpUseCase, UpdateCustomerProfilePictureUseCase],
})
export class AccountModule {
  protected readonly _type = AccountModule.name;
}
