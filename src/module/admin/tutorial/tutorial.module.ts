import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { DatabaseModule } from '@infra/database/database.module';
import { AdminTutorialController } from '@module/admin/tutorial/tutorial.controller';
import { CreateTutorialUseCase } from '@module/admin/tutorial/use-case/create-tutorial.use-case';
import { DeleteTutorialUseCase } from '@module/admin/tutorial/use-case/delete-tutorial.use-case';
import { GetAdminTutorialUseCase } from '@module/admin/tutorial/use-case/get-tutorial.use-case';
import { ListAdminTutorialsUseCase } from '@module/admin/tutorial/use-case/list-admin-tutorials.use-case';
import { UpdateTutorialUseCase } from '@module/admin/tutorial/use-case/update-tutorial.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, BucketModule, DatabaseModule],
  controllers: [AdminTutorialController],
  providers: [
    CreateTutorialUseCase,
    GetAdminTutorialUseCase,
    ListAdminTutorialsUseCase,
    UpdateTutorialUseCase,
    DeleteTutorialUseCase,
  ],
})
export class AdminTutorialModule {
  protected readonly _type = AdminTutorialModule.name;
}
