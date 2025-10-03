import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisToolsController } from '@module/customer/analysis-tools/analysis-tools.controller';
import { DocumentAnalysisModule } from '@module/customer/analysis-tools/lib/document-analysis/document-analysis.module';
import { FileProcessorModule } from '@module/customer/analysis-tools/lib/file-processor/file-processor.module';
import { CreateCnisFastAnalysisResultUseCase } from '@module/customer/analysis-tools/use-case/create-cnis-fast-analysis-result.use-case';
import { CreateCnisFastAnalysisUseCase } from '@module/customer/analysis-tools/use-case/create-cnis-fast-analysis.use-case';
import { GetCnisFastAnalysisUseCase } from '@module/customer/analysis-tools/use-case/get-cnis-fast-analysis.use-case';
import { ListCnisFastAnalysisUseCase } from '@module/customer/analysis-tools/use-case/list-cnis-fast-analysis.use-case';
import { UpdateCnisFastAnalysisUseCase } from '@module/customer/analysis-tools/use-case/update-cnis-fast-analysis.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    OrganizationSessionModule,
    FileProcessorModule,
    DocumentAnalysisModule,
  ],
  controllers: [AnalysisToolsController],
  providers: [
    CreateCnisFastAnalysisUseCase,
    UpdateCnisFastAnalysisUseCase,
    CreateCnisFastAnalysisResultUseCase,
    GetCnisFastAnalysisUseCase,
    ListCnisFastAnalysisUseCase,
  ],
})
export class AnalysisToolsModule {
  protected readonly _type = AnalysisToolsModule.name;
}
