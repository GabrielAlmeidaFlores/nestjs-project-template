import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisFastAnalysisController } from '@module/customer/cnis-fast-analysis/cnis-fast-analysis.controller';
import { FileProcessorModule } from '@module/customer/cnis-fast-analysis/lib/file-processor/file-processor.module';
import { CreateCnisFastAnalysisResultUseCase } from '@module/customer/cnis-fast-analysis/use-case/create-cnis-fast-analysis-result.use-case';
import { CreateCnisFastAnalysisUseCase } from '@module/customer/cnis-fast-analysis/use-case/create-cnis-fast-analysis.use-case';
import { GetCnisFastAnalysisUseCase } from '@module/customer/cnis-fast-analysis/use-case/get-cnis-fast-analysis.use-case';
import { ListCnisFastAnalysisUseCase } from '@module/customer/cnis-fast-analysis/use-case/list-cnis-fast-analysis.use-case';
import { UpdateCnisFastAnalysisUseCase } from '@module/customer/cnis-fast-analysis/use-case/update-cnis-fast-analysis.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    OrganizationSessionModule,
    FileProcessorModule,
    GenerativeIaModule,
  ],
  controllers: [CnisFastAnalysisController],
  providers: [
    CreateCnisFastAnalysisUseCase,
    UpdateCnisFastAnalysisUseCase,
    CreateCnisFastAnalysisResultUseCase,
    GetCnisFastAnalysisUseCase,
    ListCnisFastAnalysisUseCase,
  ],
})
export class CnisFastAnalysisModule {
  protected readonly _type = CnisFastAnalysisModule.name;
}
