import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';

import { AutoMapperService } from '@lib/mapper/implementation/auto-mapper/auto-mapper.service';
import { CustomerDatabaseAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/customer.database.auto-mapper.profile';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [AutoMapperService, CustomerDatabaseAutoMapperProfile],
  exports: [AutoMapperService],
})
export class AutoMapperModule {
  protected readonly _type = AutoMapperModule.name;
}
