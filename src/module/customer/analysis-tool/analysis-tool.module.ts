import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisToolController } from '@module/customer/analysis-tool/analysis-tool.controller';
import { DocumentAnalysisModule } from '@module/customer/analysis-tool/lib/document-analysis/document-analysis.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { CreateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/create-analysis-tool-client.use-case';
import { CreateCnisFastAnalysisResultUseCase } from '@module/customer/analysis-tool/use-case/create-cnis-fast-analysis-result.use-case';
import { CreateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/create-cnis-fast-analysis.use-case';
import { DeleteAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-client.use-case';
import DeleteCnisFastAnalysisUseCase from '@module/customer/analysis-tool/use-case/delete-cnis-fast-analysis.use-case';
import DownloadCnisCompleteAnalysisUseCase from '@module/customer/analysis-tool/use-case/download-cnis-complete-analysis.use-case';
import DownloadCnisSimplifiedAnalysisUseCase from '@module/customer/analysis-tool/use-case/download-cnis-simplified-analysis.use-case';
import { GetCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/get-cnis-fast-analysis.use-case';
import { ListAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-client.use-case';
import { ListCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/list-cnis-fast-analysis.use-case';
import { UpdateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/update-cnis-fast-analysis.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';
@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    OrganizationSessionModule,
    FileProcessorModule,
    DocumentAnalysisModule,
    ExportDocumentModule,
  ],
  controllers: [AnalysisToolController],
  providers: [
    CreateCnisFastAnalysisUseCase,
    UpdateCnisFastAnalysisUseCase,
    CreateCnisFastAnalysisResultUseCase,
    GetCnisFastAnalysisUseCase,
    ListCnisFastAnalysisUseCase,
    ListAnalysisToolClientUseCase,
    CreateAnalysisToolClientUseCase,
    DeleteCnisFastAnalysisUseCase,
    DeleteAnalysisToolClientUseCase,
    DownloadCnisCompleteAnalysisUseCase,
    DownloadCnisSimplifiedAnalysisUseCase,
  ],
})
export class AnalysisToolModule {
  protected readonly _type = AnalysisToolModule.name;
}
