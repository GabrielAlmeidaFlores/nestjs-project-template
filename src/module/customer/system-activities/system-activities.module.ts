import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { SystemActivitiesController } from '@module/customer/system-activities/system-activities.controller';
import { ListSystemActivitiesCollaboratorsUseCase } from '@module/customer/system-activities/use-case/list-system-activities-collaborators.use-case';
import { ListSystemActivitiesUseCase } from '@module/customer/system-activities/use-case/list-system-activities.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [AuthModule, OrganizationSessionModule, DatabaseModule],
  controllers: [SystemActivitiesController],
  providers: [
    ListSystemActivitiesUseCase,
    ListSystemActivitiesCollaboratorsUseCase,
  ],
})
export class SystemActivitiesModule {
  protected readonly _type = SystemActivitiesModule.name;
}
