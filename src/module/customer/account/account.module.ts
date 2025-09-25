import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { DatabaseModule } from '@infra/database/database.module';
import { AccountController } from '@module/customer/account/account.controller';
import { FileProcessorModule } from '@module/customer/account/lib/file-processor/file-processor.module';
import { OrganizationSessionModule } from '@module/customer/account/lib/organization-session/organization-session.module';
import { CustomerSignUpUseCase } from '@module/customer/account/use-case/customer-sign-up.use-case';
import { ListCustomerOrganizationsUseCase } from '@module/customer/account/use-case/list-customer-organizations.use-case';
import { SetOrganizationForCustomerUseCase } from '@module/customer/account/use-case/set-organization-for-customer.use-case';
import { UpdateCustomerProfilePictureUseCase } from '@module/customer/account/use-case/update-customer-profile-picture.use-case';
import { ValidateOrganizationSessionUseCase } from '@module/customer/account/use-case/validate-organization-session.use-case';
import { ValidateOrganizationSessionUseCaseGateway } from '@module/customer/account/use-case-gateway/validate-organization-session.use-case-gateway';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    BucketModule,
    FileProcessorModule,
    OrganizationSessionModule,
  ],
  controllers: [AccountController],
  providers: [
    CustomerSignUpUseCase,
    UpdateCustomerProfilePictureUseCase,
    ListCustomerOrganizationsUseCase,
    SetOrganizationForCustomerUseCase,
    ValidateOrganizationSessionUseCase,
    {
      useClass: ValidateOrganizationSessionUseCase,
      provide: ValidateOrganizationSessionUseCaseGateway,
    },
  ],
  exports: [ValidateOrganizationSessionUseCaseGateway],
})
export class AccountModule {
  protected readonly _type = AccountModule.name;
}
