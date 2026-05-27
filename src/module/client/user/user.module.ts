import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GetUserUseCase } from '@module/client/user/use-case/get-user.use-case';
import { UpdateUserUseCase } from '@module/client/user/use-case/update-user.use-case';
import { UserController } from '@module/client/user/user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [GetUserUseCase, UpdateUserUseCase],
})
export class UserModule {
  protected readonly _type = UserModule.name;
}
