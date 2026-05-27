import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { UserController } from '@module/social/user/user.controller';
import { GetUserUseCase } from '@module/social/user/use-case/get-user.use-case';
import { UpdateUserUseCase } from '@module/social/user/use-case/update-user.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [GetUserUseCase, UpdateUserUseCase],
})
export class UserModule {
  protected readonly _type = UserModule.name;
}
