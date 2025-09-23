import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { DatabaseModule } from '@infra/database/database.module';
import { AccountController } from '@module/customer/account/account.controller';
import { FileProcessorModule } from '@module/customer/account/lib/file-processor/file-processor.module';
import { CustomerSignUpUseCase } from '@module/customer/account/use-case/customer-sign-up.use-case';
import { ListCustomerOrganizationsUseCase } from '@module/customer/account/use-case/list-customer-organizations.use-case';
import { UpdateCustomerProfilePictureUseCase } from '@module/customer/account/use-case/update-customer-profile-picture.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule, BucketModule, FileProcessorModule],
  controllers: [AccountController],
  providers: [
    CustomerSignUpUseCase,
    UpdateCustomerProfilePictureUseCase,
    ListCustomerOrganizationsUseCase,
  ],
})
export class AccountModule {
  protected readonly _type = AccountModule.name;
}
