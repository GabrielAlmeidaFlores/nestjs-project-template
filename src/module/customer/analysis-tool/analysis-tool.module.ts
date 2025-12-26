import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { AnalysisToolController } from '@module/customer/analysis-tool/analysis-tool.controller';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { AnalyzeApprenticeStudentUseCase } from '@module/customer/analysis-tool/use-case/analyze-apprentice-student.use-case';
import { AnalyzeCtpsOutsideCnisUseCase } from '@module/customer/analysis-tool/use-case/analyze-ctps-outside-cnis.use-case';
import { AnalyzeInformalWorkUseCase } from '@module/customer/analysis-tool/use-case/analyze-informal-work.use-case';
import { AnalyzeLaborCourtDecisionUseCase } from '@module/customer/analysis-tool/use-case/analyze-labor-court-decision.use-case';
import { AnalyzeMilitaryServiceUseCase } from '@module/customer/analysis-tool/use-case/analyze-military-service.use-case';
import { AnalyzePublicServiceUseCase } from '@module/customer/analysis-tool/use-case/analyze-public-service.use-case';
import { AnalyzeRetirementPlanningRgpsPppUseCase } from '@module/customer/analysis-tool/use-case/analyze-retirement-planning-rgps-ppp.use-case';
import { AnalyzeRuralTimeUseCase } from '@module/customer/analysis-tool/use-case/analyze-rural-time.use-case';
import { AnalyzeWorkAbroadUseCase } from '@module/customer/analysis-tool/use-case/analyze-work-abroad.use-case';
import { CompareRetirementPlanningRgpsCnisCtpsUseCase } from '@module/customer/analysis-tool/use-case/compare-retirement-planning-rgps-cnis-ctps.use-case';
import { ConvertRetirementPlanningRgpsSpecialPeriodUseCase } from '@module/customer/analysis-tool/use-case/convert-retirement-planning-rgps-special-period.use-case';
import { CreateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/create-analysis-tool-client.use-case';
import { CreateCnisFastAnalysisResultUseCase } from '@module/customer/analysis-tool/use-case/create-cnis-fast-analysis-result.use-case';
import { CreateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/create-cnis-fast-analysis.use-case';
import { CreateLegalPleadingDocumentAnalysisUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading-document-analysis.use-case';
import { CreateLegalPleadingResultUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading-result.use-case';
import { CreateLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading.use-case';
import { CreateRetirementPlanningRgpsCnisUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rgps-cnis.use-case';
import { CreateRetirementPlanningRgpsPeriodUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rgps-period.use-case';
import { CreateRetirementPlanningRgpsTimeAcceleratorUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rgps-time-accelerator.use-case';
import { CreateRetirementPlanningRgpsUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rgps.use-case';
import { DeleteAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-client.use-case';
import { DeleteAnalysisToolRecordUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-record.use-case';
import { DeleteCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/delete-cnis-fast-analysis.use-case';
import { DeleteLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/delete-legal-pleading.use-case';
import { DeleteRetirementPlanningRgpsTimeAcceleratorUseCase } from '@module/customer/analysis-tool/use-case/delete-retirement-planning-rgps-time-accelerator.use-case';
import { DownloadCnisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-cnis-complete-analysis.use-case';
import { DownloadCnisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-cnis-simplified-analysis.use-case';
import { DownloadLegalPleadingCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-legal-pleading-complete-analysis.use-case';
import { DownloadLegalPleadingSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-legal-pleading-simplified-analysis.use-case';
import { GetAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/get-analysis-tool-client.use-case';
import { GetCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/get-cnis-fast-analysis.use-case';
import { GetLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/get-legal-pleading.use-case';
import { ListAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-client.use-case';
import { ListAnalysisToolRecordUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-record.use-case';
import { ListLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/list-legal-pleading.use-case';
import { UpdateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/update-analysis-tool-client.use-case';
import { UpdateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/update-cnis-fast-analysis.use-case';
import { UpdateLegalPleadingCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/update-legal-pleading-complete-analysis.use-case';
import { UpdateLegalPleadingStatusToCompleteUseCase } from '@module/customer/analysis-tool/use-case/update-legal-pleading-status-to-complete.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    OrganizationSessionModule,
    FileProcessorModule,
    AnalysisProcessorModule,
    ExportDocumentModule,
    CnisAnalyzerModule,
    GenerativeIaModule,
  ],
  controllers: [AnalysisToolController],
  providers: [
    CreateCnisFastAnalysisUseCase,
    CreateCnisFastAnalysisResultUseCase,
    GetCnisFastAnalysisUseCase,
    ListAnalysisToolClientUseCase,
    CreateAnalysisToolClientUseCase,
    DeleteCnisFastAnalysisUseCase,
    DeleteAnalysisToolClientUseCase,
    CreateLegalPleadingUseCase,
    DownloadCnisCompleteAnalysisUseCase,
    DownloadCnisSimplifiedAnalysisUseCase,
    CreateLegalPleadingResultUseCase,
    ListAnalysisToolRecordUseCase,
    GetLegalPleadingUseCase,
    ListLegalPleadingUseCase,
    CreateLegalPleadingDocumentAnalysisUseCase,
    DownloadLegalPleadingSimplifiedAnalysisUseCase,
    DownloadLegalPleadingCompleteAnalysisUseCase,
    UpdateLegalPleadingCompleteAnalysisUseCase,
    UpdateLegalPleadingStatusToCompleteUseCase,
    UpdateAnalysisToolClientUseCase,
    DeleteAnalysisToolRecordUseCase,
    DeleteLegalPleadingUseCase,
    GetAnalysisToolClientUseCase,
    UpdateCnisFastAnalysisUseCase,
    CreateRetirementPlanningRgpsUseCase,
    CreateRetirementPlanningRgpsCnisUseCase,
    CreateRetirementPlanningRgpsPeriodUseCase,
    CompareRetirementPlanningRgpsCnisCtpsUseCase,
    CreateRetirementPlanningRgpsTimeAcceleratorUseCase,
    DeleteRetirementPlanningRgpsTimeAcceleratorUseCase,
    AnalyzeRuralTimeUseCase,
    AnalyzeApprenticeStudentUseCase,
    AnalyzeWorkAbroadUseCase,
    AnalyzeRetirementPlanningRgpsPppUseCase,
    ConvertRetirementPlanningRgpsSpecialPeriodUseCase,
    AnalyzeInformalWorkUseCase,
    AnalyzeLaborCourtDecisionUseCase,
    AnalyzeMilitaryServiceUseCase,
    AnalyzePublicServiceUseCase,
    AnalyzeCtpsOutsideCnisUseCase,
  ],
})
export class AnalysisToolModule {
  protected readonly _type = AnalysisToolModule.name;
}
