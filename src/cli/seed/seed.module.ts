import { Logger, Module } from '@nestjs/common';

import { SeedService } from '@cli/seed/seed.service';
import { CustomerTermsSeeder } from '@cli/seed/seeder/customer-terms.seeder';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [SeedService, CustomerTermsSeeder, Logger],
})
export class SeedModule {
  protected readonly _type = SeedModule.name;
}
