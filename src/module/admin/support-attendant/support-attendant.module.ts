import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { EmailModule } from '@infra/email/email.module';
import { SupportAttendantController } from '@module/admin/support-attendant/support-attendant.controller';
import { CreateSupportAttendantUseCase } from '@module/admin/support-attendant/use-case/create-support-attendant.use-case';
import { GetSupportAttendantDetailsUseCase } from '@module/admin/support-attendant/use-case/get-support-attendant-details.use-case';
import { ListSupportAttendantsUseCase } from '@module/admin/support-attendant/use-case/list-support-attendants.use-case';
import { ListTicketsAdminUseCase } from '@module/admin/support-attendant/use-case/list-tickets-admin.use-case';
import { UpdateSupportAttendantUseCase } from '@module/admin/support-attendant/use-case/update-support-attendant.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule, EmailModule],
  controllers: [SupportAttendantController],
  providers: [
    CreateSupportAttendantUseCase,
    ListSupportAttendantsUseCase,
    GetSupportAttendantDetailsUseCase,
    ListTicketsAdminUseCase,
    UpdateSupportAttendantUseCase,
  ],
})
export class SupportAttendantAdminModule {
  protected readonly _type = SupportAttendantAdminModule.name;
}
