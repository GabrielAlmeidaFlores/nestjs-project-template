import { Logger, Module } from '@nestjs/common';

import { SeedService } from '@cli/seed/seed.service';
import { AdminSeeder } from '@cli/seed/seeder/admin.seeder';
import { CustomerTermsSeeder } from '@cli/seed/seeder/customer-terms.seeder';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [SeedService, AdminSeeder, CustomerTermsSeeder, Logger],
})
export class SeedModule {
  protected readonly _type = SeedModule.name;
}
