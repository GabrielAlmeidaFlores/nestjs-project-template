import { Module } from '@nestjs/common';

import { SendGridService } from '@infra/email/implementation/sendgrid/sendgrid.service';

@Module({
  providers: [SendGridService],
  exports: [SendGridService],
})
export class SendGridModule {
  protected readonly _type = SendGridModule.name;
}
