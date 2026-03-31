import { Module } from '@nestjs/common';

import { CacheStorageModule } from '@infra/cache-storage/cache-storage.module';
import { DatabaseModule } from '@infra/database/database.module';
import { AuthIdentityModule } from '@module/generic/auth-identity/auth-identity.module';
import { GenericServiceDeskController } from '@module/generic/service-desk/generic-service-desk.controller';
import { RegisterSupportAttendantUseCase } from '@module/generic/service-desk/use-case/register-support-attendant.use-case';
import { ValidateSupportAttendantInviteUseCase } from '@module/generic/service-desk/use-case/validate-support-attendant-invite.use-case';

@Module({
  imports: [DatabaseModule, CacheStorageModule, AuthIdentityModule],
  controllers: [GenericServiceDeskController],
  providers: [
    RegisterSupportAttendantUseCase,
    ValidateSupportAttendantInviteUseCase,
  ],
})
export class GenericServiceDeskModule {
  protected readonly _type = GenericServiceDeskModule.name;
}
