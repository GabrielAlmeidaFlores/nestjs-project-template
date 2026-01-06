import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { AnalysisToolController } from '@module/customer/analysis-tool/analysis-tool.controller';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { RemunerationCalculatorModule } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.module';
import { CreateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/create-analysis-tool-client.use-case';
import { CreateCnisFastAnalysisResultUseCase } from '@module/customer/analysis-tool/use-case/create-cnis-fast-analysis-result.use-case';
import { CreateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/create-cnis-fast-analysis.use-case';
import { CreateLegalPleadingDocumentAnalysisUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading-document-analysis.use-case';
import { CreateLegalPleadingResultUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading-result.use-case';
import { CreateLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading.use-case';
import { CreateRetirementPlanningRppsRemunerationUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rpps-remuneration.use-case';
import { CreateRetirementPlanningRppsResultUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rpps-result.use-case';
import { CreateRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rpps.use-case';
import { DeleteAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-client.use-case';
import { DeleteAnalysisToolRecordUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-record.use-case';
import { DeleteCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/delete-cnis-fast-analysis.use-case';
import { DeleteLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/delete-legal-pleading.use-case';
import { DeleteRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/use-case/delete-retirement-planning-rpps.use-case';
import { DownloadCnisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-cnis-complete-analysis.use-case';
import { DownloadCnisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-cnis-simplified-analysis.use-case';
import { DownloadLegalPleadingCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-legal-pleading-complete-analysis.use-case';
import { DownloadLegalPleadingSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-legal-pleading-simplified-analysis.use-case';
import { GetAnalysisToolClientLegalProceedingUseCase } from '@module/customer/analysis-tool/use-case/get-analysis-tool-client-legal-proceeding.use-case';
import { GetAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/get-analysis-tool-client.use-case';
import { GetCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/get-cnis-fast-analysis.use-case';
import { GetLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/get-legal-pleading.use-case';
import { GetRetirementPlanningRppsRemunerationCalculationUseCase } from '@module/customer/analysis-tool/use-case/get-retirement-planning-rpps-remuneration-calculation.use-case';
import { GetRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/use-case/get-retirement-planning-rpps.use-case';
import { ListAnalysisToolClientLegalProceedingUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-client-legal-proceeding.use-case';
import { ListAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-client.use-case';
import { ListAnalysisToolRecordUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-record.use-case';
import { ListCidTenUseCase } from '@module/customer/analysis-tool/use-case/list-cid-ten.use-case';
import { ListLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/list-legal-pleading.use-case';
import { ListRetirementPlanningRppsRemunerationUseCase } from '@module/customer/analysis-tool/use-case/list-retirement-planning-rpps-remuneration.use-case';
import { UpdateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/update-analysis-tool-client.use-case';
import { UpdateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/update-cnis-fast-analysis.use-case';
import { UpdateLegalPleadingCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/update-legal-pleading-complete-analysis.use-case';
import { UpdateLegalPleadingStatusToCompleteUseCase } from '@module/customer/analysis-tool/use-case/update-legal-pleading-status-to-complete.use-case';
import { UpdateRetirementPlanningRppsRemunerationUseCase } from '@module/customer/analysis-tool/use-case/update-retirement-planning-rpps-remuneration.use-case';
import { UpdateRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/use-case/update-retirement-planning-rpps.use-case';
import { GetAnalysisToolClientLegalProceedingUseCaseGateway } from '@module/customer/analysis-tool/use-case-gateway/get-analysis-tool-client-legal-proceeding.use-case-gateway';
import { ListAnalysisToolClientLegalProceedingUseCaseGateway } from '@module/customer/analysis-tool/use-case-gateway/list-analysis-tool-client-legal-proceeding.use-case-gateway';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';
@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    OrganizationSessionModule,
    OrganizationCreditModule,
    PaymentPlanModule,
    FileProcessorModule,
    AnalysisProcessorModule,
    ExportDocumentModule,
    RemunerationCalculatorModule,
    CnisAnalyzerModule,
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
    DeleteRetirementPlanningRppsUseCase,
    GetAnalysisToolClientUseCase,
    UpdateCnisFastAnalysisUseCase,
    GetAnalysisToolClientLegalProceedingUseCase,
    CreateRetirementPlanningRppsUseCase,
    CreateRetirementPlanningRppsRemunerationUseCase,
    CreateRetirementPlanningRppsResultUseCase,
    GetRetirementPlanningRppsUseCase,
    GetRetirementPlanningRppsRemunerationCalculationUseCase,
    ListRetirementPlanningRppsRemunerationUseCase,
    UpdateRetirementPlanningRppsRemunerationUseCase,
    UpdateRetirementPlanningRppsUseCase,
    ListCidTenUseCase,
    {
      provide: ListAnalysisToolClientLegalProceedingUseCaseGateway,
      useClass: ListAnalysisToolClientLegalProceedingUseCase,
    },
    {
      provide: GetAnalysisToolClientLegalProceedingUseCaseGateway,
      useClass: GetAnalysisToolClientLegalProceedingUseCase,
    },
  ],
  exports: [
    ListAnalysisToolClientLegalProceedingUseCaseGateway,
    GetAnalysisToolClientLegalProceedingUseCaseGateway,
    CreateRetirementPlanningRppsUseCase,
    CreateRetirementPlanningRppsRemunerationUseCase,
    CreateRetirementPlanningRppsResultUseCase,
    GetRetirementPlanningRppsUseCase,
    GetRetirementPlanningRppsRemunerationCalculationUseCase,
    ListRetirementPlanningRppsRemunerationUseCase,
    UpdateRetirementPlanningRppsRemunerationUseCase,
    UpdateRetirementPlanningRppsUseCase,
  ],
})
export class AnalysisToolModule {
  protected readonly _type = AnalysisToolModule.name;
}
