import { Module } from '@nestjs/common';

import { CacheStorageModule } from '@infra/cache-storage/cache-storage.module';
import { EmailModule } from '@infra/email/email.module';
import { EmailOrganizationInviteGateway } from '@module/customer/account/lib/email-organization-invite/email-organization-invite.gateway';
import { EmailOrganizationInviteService } from '@module/customer/account/lib/email-organization-invite/email-organization-invite.service';

@Module({
  imports: [CacheStorageModule, EmailModule],
  providers: [
    EmailOrganizationInviteService,
    {
      provide: EmailOrganizationInviteGateway,
      useClass: EmailOrganizationInviteService,
    },
  ],
  exports: [EmailOrganizationInviteGateway],
})
export class EmailOrganizationInviteModule {
  protected readonly _type = EmailOrganizationInviteModule.name;
}
