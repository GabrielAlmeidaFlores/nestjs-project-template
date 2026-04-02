import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { DatabaseModule } from '@infra/database/database.module';
import { ServiceDeskController } from '@module/support/service-desk/service-desk.controller';
import { CreateSupportTicketMessageUseCase } from '@module/support/service-desk/use-case/create-support-ticket-message.use-case';
import { GetSupportTicketDetailsUseCase } from '@module/support/service-desk/use-case/get-support-ticket-details.use-case';
import { ListSupportTicketMessagesUseCase } from '@module/support/service-desk/use-case/list-support-ticket-messages.use-case';
import { ListSupportTicketsUseCase } from '@module/support/service-desk/use-case/list-support-tickets.use-case';
import { ResolveSupportTicketUseCase } from '@module/support/service-desk/use-case/resolve-support-ticket.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule, BucketModule],
  controllers: [ServiceDeskController],
  providers: [
    ListSupportTicketsUseCase,
    GetSupportTicketDetailsUseCase,
    ListSupportTicketMessagesUseCase,
    CreateSupportTicketMessageUseCase,
    ResolveSupportTicketUseCase,
  ],
})
export class ServiceDeskModule {
  protected readonly _type = ServiceDeskModule.name;
}
