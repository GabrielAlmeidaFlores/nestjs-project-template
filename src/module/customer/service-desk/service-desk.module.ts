import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { DatabaseModule } from '@infra/database/database.module';
import { ServiceDeskController } from '@module/customer/service-desk/service-desk.controller';
import { CreateCustomerSupportTicketMessageUseCase } from '@module/customer/service-desk/use-case/create-customer-support-ticket-message.use-case';
import { CreateCustomerSupportTicketUseCase } from '@module/customer/service-desk/use-case/create-customer-support-ticket.use-case';
import { GetCustomerSupportTicketDetailsUseCase } from '@module/customer/service-desk/use-case/get-customer-support-ticket-details.use-case';
import { ListCustomerSupportTicketMessagesUseCase } from '@module/customer/service-desk/use-case/list-customer-support-ticket-messages.use-case';
import { ListCustomerSupportTicketsUseCase } from '@module/customer/service-desk/use-case/list-customer-support-tickets.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    OrganizationSessionModule,
    DatabaseModule,
    BucketModule,
  ],
  controllers: [ServiceDeskController],
  providers: [
    ListCustomerSupportTicketsUseCase,
    GetCustomerSupportTicketDetailsUseCase,
    ListCustomerSupportTicketMessagesUseCase,
    CreateCustomerSupportTicketMessageUseCase,
    CreateCustomerSupportTicketUseCase,
  ],
})
export class ServiceDeskModule {
  protected readonly _type = ServiceDeskModule.name;
}
