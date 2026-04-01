import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { EmailModule } from '@infra/email/email.module';
import { SupportAttendantController } from '@module/admin/support-attendant/support-attendant.controller';
import { CreateSupportAttendantUseCase } from '@module/admin/support-attendant/use-case/create-support-attendant.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule, EmailModule],
  controllers: [SupportAttendantController],
  providers: [CreateSupportAttendantUseCase],
})
export class SupportAttendantAdminModule {
  protected readonly _type = SupportAttendantAdminModule.name;
}
