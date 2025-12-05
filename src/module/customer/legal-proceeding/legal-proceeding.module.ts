import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { LegalProceedingController } from '@module/customer/legal-proceeding/legal-proceeding.controller';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [LegalProceedingController],
  exports: [],
})
export class LegalProceedingModule {
  protected readonly _type = LegalProceedingModule.name;
}
