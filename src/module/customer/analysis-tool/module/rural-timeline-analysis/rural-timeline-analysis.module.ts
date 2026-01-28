import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { RuralTimelineAnalysisController } from '@module/customer/analysis-tool/module/rural-timeline-analysis/rural-timeline-analysis.controller';
import { CreateRuralTimelineAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/create-rural-timeline-analysis.use-case';
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
  providers: [CreateRuralTimelineAnalysisUseCase],
  exports: [],
})
export class RuralTimelineAnalysisModule {
  protected readonly _type = RuralTimelineAnalysisModule.name;
}
