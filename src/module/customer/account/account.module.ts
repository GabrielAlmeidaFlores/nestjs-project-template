import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { DatabaseModule } from '@infra/database/database.module';
import { PaymentGatewayModule } from '@infra/payment-gateway/payment-gateway.module';
import { AccountController } from '@module/customer/account/account.controller';
import { EmailOrganizationInviteModule } from '@module/customer/account/lib/email-organization-invite/email-organization-invite.module';
import { FileProcessorModule } from '@module/customer/account/lib/file-processor/file-processor.module';
import { OrganizationSessionModule } from '@module/customer/account/lib/organization-session/organization-session.module';
import { ConfirmCustomerTermsAcceptanceUseCase } from '@module/customer/account/use-case/confirm-customer-terms-acceptance.use-case';
import { CustomerSignUpUseCase } from '@module/customer/account/use-case/customer-sign-up.use-case';
import { DeleteOrganizationMemberUseCase } from '@module/customer/account/use-case/delete-organization-member.use-case';
import { FirstAccessInvitedMemberUseCase } from '@module/customer/account/use-case/first-access-invited-member.use-case';
import { GetAuthenticatedCustomerDataUseCase } from '@module/customer/account/use-case/get-authenticated-customer-data.use-case';
import { GetCustomerTermsAcceptanceUseCase } from '@module/customer/account/use-case/get-customer-terms-acceptance.use-case';
import { InviteOrganizationMemberUseCase } from '@module/customer/account/use-case/invite-organization-member.use-case';
import { ListCustomerOrganizationsUseCase } from '@module/customer/account/use-case/list-customer-organizations.use-case';
import { ListOrganizationCollaboratorsUseCase } from '@module/customer/account/use-case/list-organization-collaborators.use-case';
import { SetOrganizationCookieUseCase } from '@module/customer/account/use-case/set-organization-cookie.use-case';
import { SetOrganizationForCustomerUseCase } from '@module/customer/account/use-case/set-organization-for-customer.use-case';
import { UpdateCustomerProfilePictureUseCase } from '@module/customer/account/use-case/update-customer-profile-picture.use-case';
import { UpdateCustomerUseCase } from '@module/customer/account/use-case/update-customer.use-case';
import { UpdateOrganizationMemberStatusUseCase } from '@module/customer/account/use-case/update-organization-member-status.use-case';
import { ValidateOrganizationInviteUseCase } from '@module/customer/account/use-case/validate-organization-invite.use-case';
import { ValidateOrganizationSessionUseCase } from '@module/customer/account/use-case/validate-organization-session.use-case';
import { SetOrganizationCookieUseCaseGateway } from '@module/customer/account/use-case-gateway/set-organization-cookie.use-case-gateway';
import { ValidateOrganizationSessionUseCaseGateway } from '@module/customer/account/use-case-gateway/validate-organization-session.use-case-gateway';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    BucketModule,
    EmailOrganizationInviteModule,
    FileProcessorModule,
    OrganizationSessionModule,
    PaymentGatewayModule,
  ],
  controllers: [AccountController],
  providers: [
    CustomerSignUpUseCase,
    UpdateCustomerProfilePictureUseCase,
    UpdateCustomerUseCase,
    ListCustomerOrganizationsUseCase,
    SetOrganizationForCustomerUseCase,
    ValidateOrganizationSessionUseCase,
    GetAuthenticatedCustomerDataUseCase,
    GetCustomerTermsAcceptanceUseCase,
    ConfirmCustomerTermsAcceptanceUseCase,
    InviteOrganizationMemberUseCase,
    ValidateOrganizationInviteUseCase,
    FirstAccessInvitedMemberUseCase,
    ListOrganizationCollaboratorsUseCase,
    UpdateOrganizationMemberStatusUseCase,
    DeleteOrganizationMemberUseCase,
    {
      useClass: ValidateOrganizationSessionUseCase,
      provide: ValidateOrganizationSessionUseCaseGateway,
    },
    SetOrganizationCookieUseCase,
    {
      useClass: SetOrganizationCookieUseCase,
      provide: SetOrganizationCookieUseCaseGateway,
    },
  ],
  exports: [
    ValidateOrganizationSessionUseCaseGateway,
    SetOrganizationCookieUseCaseGateway,
  ],
})
export class AccountModule {
  protected readonly _type = AccountModule.name;
}
