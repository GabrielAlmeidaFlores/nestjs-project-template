import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { RemunerationCalculatorModule } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.module';
import { GeneralUrbanRetirementController } from '@module/customer/analysis-tool/module/general-urban-retirement/general-urban-retirement.controller';
import { AnalyzeGeneralUrbanRetirementDocumentsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/analyze-general-urban-retirement-documents.use-case';
import { CreateGeneralUrbanRetirementAnalysisPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/create-general-urban-retirement-analysis-period.use-case';
import { CreateGeneralUrbanRetirementAnalysisRemunerationUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/create-general-urban-retirement-analysis-remuneration.use-case';
import { CreateGeneralUrbanRetirementAnalysisResultUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/create-general-urban-retirement-analysis-result.use-case';
import { CreateGeneralUrbanRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/create-general-urban-retirement-analysis.use-case';
import { DownloadGeneralUrbanRetirementCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/download-general-urban-retirement-complete-analysis.use-case';
import { DownloadGeneralUrbanRetirementSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/download-general-urban-retirement-simplified-analysis.use-case';
import { GetGeneralUrbanRetirementAnalysisRemunerationCalculationUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/get-general-urban-retirement-analysis-remuneration-calculation.use-case';
import { GetGeneralUrbanRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/get-general-urban-retirement-analysis.use-case';
import { ListGeneralUrbanRetirementAnalysisRemunerationUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/list-general-urban-retirement-analysis-remuneration.use-case';
import { PatchGeneralUrbanRetirementAnalysisPeriodLawyerObservationsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/patch-general-urban-retirement-analysis-period-lawyer-observations.use-case';
import { UpdateGeneralUrbanRetirementAnalysisPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/update-general-urban-retirement-analysis-period.use-case';
import { UpdateGeneralUrbanRetirementAnalysisRemunerationUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/update-general-urban-retirement-analysis-remuneration.use-case';
import { UpdateGeneralUrbanRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/update-general-urban-retirement-analysis.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    AnalysisProcessorModule,
    FileProcessorModule,
    RemunerationCalculatorModule,
    OrganizationCreditModule,
    OrganizationSessionModule,
    PaymentPlanModule,
    ExportDocumentModule,
  ],
  controllers: [GeneralUrbanRetirementController],
  providers: [
    CreateGeneralUrbanRetirementAnalysisUseCase,
    CreateGeneralUrbanRetirementAnalysisPeriodUseCase,
    CreateGeneralUrbanRetirementAnalysisRemunerationUseCase,
    UpdateGeneralUrbanRetirementAnalysisPeriodUseCase,
    PatchGeneralUrbanRetirementAnalysisPeriodLawyerObservationsUseCase,
    UpdateGeneralUrbanRetirementAnalysisRemunerationUseCase,
    GetGeneralUrbanRetirementAnalysisUseCase,
    GetGeneralUrbanRetirementAnalysisRemunerationCalculationUseCase,
    ListGeneralUrbanRetirementAnalysisRemunerationUseCase,
    UpdateGeneralUrbanRetirementAnalysisUseCase,
    CreateGeneralUrbanRetirementAnalysisResultUseCase,
    AnalyzeGeneralUrbanRetirementDocumentsUseCase,
    DownloadGeneralUrbanRetirementCompleteAnalysisUseCase,
    DownloadGeneralUrbanRetirementSimplifiedAnalysisUseCase,
  ],
})
export class GeneralUrbanRetirementModule {
  protected readonly _type = GeneralUrbanRetirementModule.name;
}
