import { Module } from '@nestjs/common';

import { CacheStorageModule } from '@infra/cache-storage/cache-storage.module';
import { EmailModule } from '@infra/email/email.module';
import { EmailForgotPasswordGateway } from '@module/generic/auth-identity/lib/email-forgot-password/email-forgot-password.gateway';
import { EmailForgotPasswordService } from '@module/generic/auth-identity/lib/email-forgot-password/email-forgot-password.service';

@Module({
  imports: [EmailModule, CacheStorageModule],
  providers: [
    EmailForgotPasswordService,
    {
      provide: EmailForgotPasswordGateway,
      useClass: EmailForgotPasswordService,
    },
  ],
  exports: [EmailForgotPasswordGateway],
})
export class EmailForgotPasswordModule {
  protected readonly _type = EmailForgotPasswordModule.name;
}
