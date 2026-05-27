import { Logger, Module } from '@nestjs/common';

import { SeedService } from '@cli/seed/seed.service';
import { UserSeeder } from '@cli/seed/seeder/user.seeder';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [SeedService, UserSeeder, Logger],
})
export class SeedModule {
  protected readonly _type = SeedModule.name;
}
