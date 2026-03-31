import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { DatabaseModule } from '@infra/database/database.module';
import { ServiceDeskAttendantController } from '@module/customer/service-desk/service-desk-attendant.controller';
import { ServiceDeskController } from '@module/customer/service-desk/service-desk.controller';
import { CreateSupportTicketUseCase } from '@module/customer/service-desk/use-case/create-support-ticket.use-case';
import { GetSupportAttendantProfileUseCase } from '@module/customer/service-desk/use-case/get-support-attendant-profile.use-case';
import { GetSupportTicketDetailUseCase } from '@module/customer/service-desk/use-case/get-support-ticket-detail.use-case';
import { ListSupportTicketsAttendantUseCase } from '@module/customer/service-desk/use-case/list-support-tickets-attendant.use-case';
import { ListSupportTicketsUseCase } from '@module/customer/service-desk/use-case/list-support-tickets.use-case';
import { ResolveSupportTicketUseCase } from '@module/customer/service-desk/use-case/resolve-support-ticket.use-case';
import { SendTicketMessageAttendantUseCase } from '@module/customer/service-desk/use-case/send-ticket-message-attendant.use-case';
import { SendTicketMessageCustomerUseCase } from '@module/customer/service-desk/use-case/send-ticket-message-customer.use-case';
import { StartSupportTicketUseCase } from '@module/customer/service-desk/use-case/start-support-ticket.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    OrganizationSessionModule,
    DatabaseModule,
    BucketModule,
  ],
  controllers: [ServiceDeskController, ServiceDeskAttendantController],
  providers: [
    ListSupportTicketsUseCase,
    CreateSupportTicketUseCase,
    GetSupportTicketDetailUseCase,
    SendTicketMessageCustomerUseCase,
    ListSupportTicketsAttendantUseCase,
    StartSupportTicketUseCase,
    ResolveSupportTicketUseCase,
    SendTicketMessageAttendantUseCase,
    GetSupportAttendantProfileUseCase,
  ],
})
export class ServiceDeskModule {
  protected readonly _type = ServiceDeskModule.name;
}
