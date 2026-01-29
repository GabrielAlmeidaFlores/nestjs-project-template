import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { RuralTimelineAnalysisController } from '@module/customer/analysis-tool/module/rural-timeline-analysis/rural-timeline-analysis.controller';
import { AddRuralTimelineAnalysisPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/add-rural-timeline-analysis-period-document.use-case';
import { CreateRuralTimelineAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/create-rural-timeline-analysis.use-case';
import { DeleteRuralTimelineAnalysisPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/delete-rural-timeline-analysis-period-document.use-case';
import { GetRuralTimelineAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/get-rural-timeline-analysis.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    FileProcessorModule,
    OrganizationSessionModule,
  ],
  controllers: [RuralTimelineAnalysisController],
  providers: [
    CreateRuralTimelineAnalysisUseCase,
    GetRuralTimelineAnalysisUseCase,
    AddRuralTimelineAnalysisPeriodDocumentUseCase,
    DeleteRuralTimelineAnalysisPeriodDocumentUseCase,
  ],
  exports: [],
})
export class RuralTimelineAnalysisModule {
  protected readonly _type = RuralTimelineAnalysisModule.name;
}
