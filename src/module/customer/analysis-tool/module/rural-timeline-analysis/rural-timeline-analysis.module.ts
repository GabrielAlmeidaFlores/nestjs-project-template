import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { CnisProcessorModule } from '@lib/cnis-processor/cnis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { RuralTimelineAnalysisController } from '@module/customer/analysis-tool/module/rural-timeline-analysis/rural-timeline-analysis.controller';
import { AddRuralTimelineAnalysisCnisDocumentUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/add-rural-timeline-analysis-cnis-document.use-case';
import { AddRuralTimelineAnalysisPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/add-rural-timeline-analysis-period-document.use-case';
import { AnalyzeRuralTimelineAnalysisPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/analyze-rural-timeline-analysis-period-document.use-case';
import { CreateRuralTimelineAnalysisCnisContributionPeriodUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/create-rural-timeline-analysis-cnis-contribution-period.use-case';
import { CreateRuralTimelineAnalysisPeriodEconomicAspectsUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/create-rural-timeline-analysis-period-economic-aspects.use-case';
import { CreateRuralTimelineAnalysisPeriodFamilyGroupMemberUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/create-rural-timeline-analysis-period-family-group-member.use-case';
import { CreateRuralTimelineAnalysisPeriodPropertyUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/create-rural-timeline-analysis-period-property.use-case';
import { CreateRuralTimelineAnalysisPeriodResidenceUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/create-rural-timeline-analysis-period-residence.use-case';
import { CreateRuralTimelineAnalysisPeriodUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/create-rural-timeline-analysis-period.use-case';
import { CreateRuralTimelineAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/create-rural-timeline-analysis.use-case';
import { CreateRuralTimelineCnisContributionPeriodOverdueContributionUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/create-rural-timeline-cnis-contribution-period-overdue-contribution.use-case';
import { DeleteRuralTimelineAnalysisCnisContributionPeriodUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/delete-rural-timeline-analysis-cnis-contribution-period.use-case';
import { DeleteRuralTimelineAnalysisPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/delete-rural-timeline-analysis-period-document.use-case';
import { DeleteRuralTimelineAnalysisPeriodEconomicAspectsUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/delete-rural-timeline-analysis-period-economic-aspects.use-case';
import { DeleteRuralTimelineAnalysisPeriodFamilyGroupMemberUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/delete-rural-timeline-analysis-period-family-group-member.use-case';
import { DeleteRuralTimelineAnalysisPeriodPropertyUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/delete-rural-timeline-analysis-period-property.use-case';
import { DeleteRuralTimelineAnalysisPeriodResidenceUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/delete-rural-timeline-analysis-period-residence.use-case';
import { DeleteRuralTimelineAnalysisPeriodUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/delete-rural-timeline-analysis-period.use-case';
import { DeleteRuralTimelineAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/delete-rural-timeline-analysis.use-case';
import { DeleteRuralTimelineCnisContributionPeriodOverdueContributionUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/delete-rural-timeline-cnis-contribution-period-overdue-contribution.use-case';
import { DownloadRuralTimelineCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/download-rural-timeline-complete-analysis.use-case';
import { DownloadRuralTimelineSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/download-rural-timeline-simplified-analysis.use-case';
import { GenerateRuralTimelineAnalysisPeriodDocumentAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/generate-rural-timeline-analysis-period-document-analysis.use-case';
import { GenerateRuralTimelineAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/generate-rural-timeline-analysis.use-case';
import { GenerateRuralTimelineConsolidatedDocumentAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/generate-rural-timeline-consolidated-document-analysis.use-case';
import { GetRuralTimelineAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/get-rural-timeline-analysis.use-case';
import { GetRuralTimelineCnisAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/get-rural-timeline-cnis-analysis.use-case';
import { ListRuralTimelineAnalysisCnisContributionPeriodUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/list-rural-timeline-analysis-cnis-contribution-period.use-case';
import { SyncRuralTimelineAnalysisCnisContributionPeriodUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/sync-rural-timeline-analysis-cnis-contribution-period.use-case';
import { UpdateRuralTimelineAnalysisCnisContributionPeriodUnderMinimumUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/update-rural-timeline-analysis-cnis-contribution-period-under-minimum.use-case';
import { UpdateRuralTimelineAnalysisCnisContributionPeriodUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/update-rural-timeline-analysis-cnis-contribution-period.use-case';
import { UpdateRuralTimelineAnalysisDocumentUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/update-rural-timeline-analysis-document.use-case';
import { UpdateRuralTimelineAnalysisPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/update-rural-timeline-analysis-period-document.use-case';
import { UpdateRuralTimelineAnalysisPeriodEconomicAspectsUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/update-rural-timeline-analysis-period-economic-aspects.use-case';
import { UpdateRuralTimelineAnalysisPeriodFamilyGroupMemberUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/update-rural-timeline-analysis-period-family-group-member.use-case';
import { UpdateRuralTimelineAnalysisPeriodPropertyUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/update-rural-timeline-analysis-period-property.use-case';
import { UpdateRuralTimelineAnalysisPeriodResidenceUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/update-rural-timeline-analysis-period-residence.use-case';
import { UpdateRuralTimelineAnalysisPeriodUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/update-rural-timeline-analysis-period.use-case';
import { UpdateRuralTimelineAnalysisToolRecordStatusToCompleteUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/update-rural-timeline-analysis-tool-record-status-to-complete.use-case';
import { UpdateRuralTimelineAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/update-rural-timeline-analysis.use-case';
import { UpdateRuralTimelineCnisContributionPeriodOverdueContributionUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/update-rural-timeline-cnis-contribution-period-overdue-contribution.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    CnisAnalyzerModule,
    CnisProcessorModule,
    DatabaseModule,
    ExportDocumentModule,
    FileProcessorModule,
    GenerativeIaModule,
    OrganizationCreditModule,
    OrganizationSessionModule,
    PaymentPlanModule,
  ],
  controllers: [RuralTimelineAnalysisController],
  providers: [
    CreateRuralTimelineAnalysisUseCase,
    DeleteRuralTimelineAnalysisUseCase,
    CreateRuralTimelineAnalysisPeriodUseCase,
    GetRuralTimelineAnalysisUseCase,
    GetRuralTimelineCnisAnalysisUseCase,
    GenerateRuralTimelineAnalysisUseCase,
    DownloadRuralTimelineCompleteAnalysisUseCase,
    DownloadRuralTimelineSimplifiedAnalysisUseCase,
    AddRuralTimelineAnalysisCnisDocumentUseCase,
    AddRuralTimelineAnalysisPeriodDocumentUseCase,
    AnalyzeRuralTimelineAnalysisPeriodDocumentUseCase,
    GenerateRuralTimelineAnalysisPeriodDocumentAnalysisUseCase,
    GenerateRuralTimelineConsolidatedDocumentAnalysisUseCase,
    DeleteRuralTimelineAnalysisPeriodDocumentUseCase,
    ListRuralTimelineAnalysisCnisContributionPeriodUseCase,
    CreateRuralTimelineAnalysisCnisContributionPeriodUseCase,
    SyncRuralTimelineAnalysisCnisContributionPeriodUseCase,
    UpdateRuralTimelineAnalysisCnisContributionPeriodUseCase,
    DeleteRuralTimelineAnalysisCnisContributionPeriodUseCase,
    UpdateRuralTimelineAnalysisUseCase,
    UpdateRuralTimelineAnalysisPeriodUseCase,
    UpdateRuralTimelineAnalysisDocumentUseCase,
    UpdateRuralTimelineAnalysisPeriodDocumentUseCase,
    UpdateRuralTimelineAnalysisPeriodPropertyUseCase,
    UpdateRuralTimelineAnalysisPeriodEconomicAspectsUseCase,
    UpdateRuralTimelineAnalysisPeriodFamilyGroupMemberUseCase,
    UpdateRuralTimelineAnalysisPeriodResidenceUseCase,
    UpdateRuralTimelineAnalysisCnisContributionPeriodUnderMinimumUseCase,
    CreateRuralTimelineAnalysisPeriodPropertyUseCase,
    CreateRuralTimelineAnalysisPeriodResidenceUseCase,
    CreateRuralTimelineAnalysisPeriodEconomicAspectsUseCase,
    CreateRuralTimelineAnalysisPeriodFamilyGroupMemberUseCase,
    DeleteRuralTimelineAnalysisPeriodUseCase,
    DeleteRuralTimelineAnalysisPeriodPropertyUseCase,
    DeleteRuralTimelineAnalysisPeriodResidenceUseCase,
    DeleteRuralTimelineAnalysisPeriodEconomicAspectsUseCase,
    DeleteRuralTimelineAnalysisPeriodFamilyGroupMemberUseCase,
    UpdateRuralTimelineAnalysisToolRecordStatusToCompleteUseCase,
    CreateRuralTimelineCnisContributionPeriodOverdueContributionUseCase,
    UpdateRuralTimelineCnisContributionPeriodOverdueContributionUseCase,
    DeleteRuralTimelineCnisContributionPeriodOverdueContributionUseCase,
  ],
  exports: [],
})
export class RuralTimelineAnalysisModule {
  protected readonly _type = RuralTimelineAnalysisModule.name;
}
