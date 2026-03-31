import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { CacheStorageModule } from '@infra/cache-storage/cache-storage.module';
import { DatabaseModule } from '@infra/database/database.module';
import { EmailModule } from '@infra/email/email.module';
import { AuthIdentitySessionModule } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.module';
import { AdminServiceDeskController } from '@module/admin/service-desk/admin-service-desk.controller';
import { InviteNewSupportAttendantUseCase } from '@module/admin/service-desk/use-case/invite-new-support-attendant.use-case';
import { ListAdminSupportTicketsByAttendantUseCase } from '@module/admin/service-desk/use-case/list-admin-support-tickets-by-attendant.use-case';
import { ListAdminSupportTicketsUseCase } from '@module/admin/service-desk/use-case/list-admin-support-tickets.use-case';
import { ListSupportAttendantsUseCase } from '@module/admin/service-desk/use-case/list-support-attendants.use-case';
import { ToggleSupportAttendantStatusUseCase } from '@module/admin/service-desk/use-case/toggle-support-attendant-status.use-case';
import { UpdateSupportAttendantUseCase } from '@module/admin/service-desk/use-case/update-support-attendant.use-case';
import { GetSupportTicketDetailUseCase } from '@module/customer/service-desk/use-case/get-support-ticket-detail.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule, BucketModule, CacheStorageModule, EmailModule, AuthIdentitySessionModule],
  controllers: [AdminServiceDeskController],
  providers: [
    InviteNewSupportAttendantUseCase,
    ListAdminSupportTicketsByAttendantUseCase,
    ListAdminSupportTicketsUseCase,
    ListSupportAttendantsUseCase,
    ToggleSupportAttendantStatusUseCase,
    UpdateSupportAttendantUseCase,
    GetSupportTicketDetailUseCase,
  ],
})
export class AdminServiceDeskModule {
  protected readonly _type = AdminServiceDeskModule.name;
}
