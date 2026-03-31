import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { SystemActivitiesAdminController } from '@module/admin/system-activities/system-activities.controller';
import { ListSystemActivitiesAdminUseCase } from '@module/admin/system-activities/use-case/list-system-activities-admin.use-case';
import { ListSystemActivitiesCollaboratorsAdminUseCase } from '@module/admin/system-activities/use-case/list-system-activities-collaborators-admin.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [SystemActivitiesAdminController],
  providers: [
    ListSystemActivitiesAdminUseCase,
    ListSystemActivitiesCollaboratorsAdminUseCase,
  ],
})
export class SystemActivitiesAdminModule {
  protected readonly _type = SystemActivitiesAdminModule.name;
}
