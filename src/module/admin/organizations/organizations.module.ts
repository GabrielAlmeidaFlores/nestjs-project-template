import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { OrganizationsAdminController } from '@module/admin/organizations/organizations.controller';
import { ListOrganizationsAdminUseCase } from '@module/admin/organizations/use-case/list-organizations-admin.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [OrganizationsAdminController],
  providers: [ListOrganizationsAdminUseCase],
})
export class OrganizationsAdminModule {
  protected readonly _type = OrganizationsAdminModule.name;
}
