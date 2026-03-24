import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { SystemLogsController } from '@module/admin/system-logs/system-logs.controller';
import { ListSystemLogsErrorsUseCase } from '@module/admin/system-logs/use-case/list-system-logs-errors.use-case';
import { ListSystemLogsSuccessUseCase } from '@module/admin/system-logs/use-case/list-system-logs-success.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [SystemLogsController],
  providers: [ListSystemLogsSuccessUseCase, ListSystemLogsErrorsUseCase],
})
export class SystemLogsModule {
  protected readonly _type = SystemLogsModule.name;
}
