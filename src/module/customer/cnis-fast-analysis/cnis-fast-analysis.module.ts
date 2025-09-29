import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { DatabaseModule } from '@infra/database/database.module';
import { CnisFastAnalysisController } from '@module/customer/cnis-fast-analysis/cnis-fast-analysis.controller';
import { CreateCnisFastAnalysisUseCase } from '@module/customer/cnis-fast-analysis/use-case/create-cnis-fast-analysis.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    BucketModule,
    OrganizationSessionModule,
  ],
  controllers: [CnisFastAnalysisController],
  providers: [CreateCnisFastAnalysisUseCase],
})
export class CnisFastAnalysisModule {
  protected readonly _type = CnisFastAnalysisModule.name;
}
