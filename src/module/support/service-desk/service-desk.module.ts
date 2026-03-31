import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { DatabaseModule } from '@infra/database/database.module';
import { ServiceDeskController } from '@module/support/service-desk/service-desk.controller';
import { GetSupportTicketDetailsUseCase } from '@module/support/service-desk/use-case/get-support-ticket-details.use-case';
import { ListSupportTicketsUseCase } from '@module/support/service-desk/use-case/list-support-tickets.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule, BucketModule],
  controllers: [ServiceDeskController],
  providers: [ListSupportTicketsUseCase, GetSupportTicketDetailsUseCase],
})
export class ServiceDeskModule {
  protected readonly _type = ServiceDeskModule.name;
}
