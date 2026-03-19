import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { DatabaseModule } from '@infra/database/database.module';
import { AdminTutorialController } from '@module/admin/tutorial/tutorial.controller';
import { CreateTutorialUseCase } from '@module/admin/tutorial/use-case/create-tutorial.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule, BucketModule],
  controllers: [AdminTutorialController],
  providers: [CreateTutorialUseCase],
})
export class AdminTutorialModule {
  protected readonly _type = AdminTutorialModule.name;
}
