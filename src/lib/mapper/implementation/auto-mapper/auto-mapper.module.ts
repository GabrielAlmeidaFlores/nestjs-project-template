import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';

import { AutoMapperService } from '@lib/mapper/implementation/auto-mapper/auto-mapper.service';
import { CustomerAddressDatabaseAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/customer/customer-address.database.auto-mapper.profile';
import { CustomerProfessionalDataDatabaseAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/customer/customer-professional-data.database.auto-mapper.profile';
import { CustomerDatabaseAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/customer/customer.database.auto-mapper.profile';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [
    AutoMapperService,
    CustomerDatabaseAutoMapperProfile,
    CustomerAddressDatabaseAutoMapperProfile,
    CustomerProfessionalDataDatabaseAutoMapperProfile,
  ],
  exports: [AutoMapperService],
})
export class AutoMapperModule {
  protected readonly _type = AutoMapperModule.name;
}
