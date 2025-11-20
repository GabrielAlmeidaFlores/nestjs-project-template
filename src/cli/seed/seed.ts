import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { SeedModule } from '@cli/seed/seed.module';
import { SeedService } from '@cli/seed/seed.service';

async function bootstrap(): Promise<void> {
  return NestFactory.createApplicationContext(SeedModule)
    .then((appContext) => {
      const logger = appContext.get(Logger);
      const seedService = appContext.get(SeedService);
      seedService
        .seed()
        .then(() => {
          logger.log('Seed completed!', 'Seed');
        })
        .catch((error) => {
          logger.error('Seed failed!', 'Seed');
          throw error;
        })
        .finally(() => {
          void appContext.close();
        });
    })
    .catch((error) => {
      throw error;
    });
}
void bootstrap();
