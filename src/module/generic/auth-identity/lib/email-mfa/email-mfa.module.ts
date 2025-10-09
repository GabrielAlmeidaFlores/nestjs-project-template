import { Module } from '@nestjs/common';

import { CacheStorageModule } from '@infra/cache-storage/cache-storage.module';
import { EmailModule } from '@infra/email/email.module';
import { EmailMFAGateway } from '@module/generic/auth-identity/lib/email-mfa/email-mfa.gateway';
import { EmailMFAService } from '@module/generic/auth-identity/lib/email-mfa/email-mfa.service';

@Module({
  imports: [EmailModule, CacheStorageModule],
  providers: [
    EmailMFAService,
    {
      provide: EmailMFAGateway,
      useClass: EmailMFAService,
    },
  ],
  exports: [EmailMFAGateway],
})
export class EmailMFAModule {
  protected readonly _type = EmailMFAModule.name;
}
