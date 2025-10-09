import { Module } from '@nestjs/common';

import { EmailGateway } from '@infra/email/email.gateway';
import { SendGridModule } from '@infra/email/implementation/sendgrid/sendgrid.module';
import { SendGridService } from '@infra/email/implementation/sendgrid/sendgrid.service';

@Module({
  imports: [SendGridModule],
  providers: [
    {
      provide: EmailGateway,
      useClass: SendGridService,
    },
    SendGridService,
  ],
  exports: [EmailGateway],
})
export class EmailModule {
  protected readonly _type = EmailModule.name;
}
