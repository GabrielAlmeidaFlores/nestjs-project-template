import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { CnisProcessorModule } from '@lib/cnis-processor/cnis-processor.module';
import { AnalysisActivityTrackerModule } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { SpecialRetirementGrantController } from '@module/customer/analysis-tool/module/special-retirement-grant/special-retirement-grant.controller';
import { CreateSpecialRetirementGrantFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/create-special-retirement-grant-first-analysis.use-case';
import { CreateSpecialRetirementGrantPeriodObservationUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/create-special-retirement-grant-period-observation.use-case';
import { CreateSpecialRetirementGrantPeriodUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/create-special-retirement-grant-period.use-case';
import { CreateSpecialRetirementGrantResultUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/create-special-retirement-grant-result.use-case';
import { CreateSpecialRetirementGrantTechnicalDiagnosisUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/create-special-retirement-grant-technical-diagnosis.use-case';
import { CreateSpecialRetirementGrantUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/create-special-retirement-grant.use-case';
import { DeleteSpecialRetirementGrantPeriodObservationUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/delete-special-retirement-grant-period-observation.use-case';
import { DownloadSpecialRetirementGrantCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/download-special-retirement-grant-complete-analysis.use-case';
import { DownloadSpecialRetirementGrantSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/download-special-retirement-grant-simplified-analysis.use-case';
import { GetSpecialRetirementGrantResultUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/get-special-retirement-grant-result.use-case';
import { GetSpecialRetirementGrantUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/get-special-retirement-grant.use-case';
import { UpdateSpecialRetirementGrantPeriodObservationUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/update-special-retirement-grant-period-observation.use-case';
import { UpdateSpecialRetirementGrantPeriodUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/update-special-retirement-grant-period.use-case';
import { UpdateSpecialRetirementGrantTechnicalDiagnosisUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/update-special-retirement-grant-technical-diagnosis.use-case';
import { UpdateSpecialRetirementGrantUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/update-special-retirement-grant.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    GenerativeIaModule,
    OrganizationSessionModule,
    OrganizationCreditModule,
    PaymentPlanModule,
    FileProcessorModule,
    AnalysisProcessorModule,
    AnalysisActivityTrackerModule,
    ExportDocumentModule,
    CnisAnalyzerModule,
    CnisProcessorModule,
  ],
  controllers: [SpecialRetirementGrantController],
  providers: [
    CreateSpecialRetirementGrantUseCase,
    CreateSpecialRetirementGrantFirstAnalysisUseCase,
    CreateSpecialRetirementGrantPeriodUseCase,
    UpdateSpecialRetirementGrantPeriodUseCase,
    CreateSpecialRetirementGrantTechnicalDiagnosisUseCase,
    UpdateSpecialRetirementGrantTechnicalDiagnosisUseCase,
    CreateSpecialRetirementGrantPeriodObservationUseCase,
    UpdateSpecialRetirementGrantPeriodObservationUseCase,
    DeleteSpecialRetirementGrantPeriodObservationUseCase,
    GetSpecialRetirementGrantUseCase,
    GetSpecialRetirementGrantResultUseCase,
    UpdateSpecialRetirementGrantUseCase,
    CreateSpecialRetirementGrantResultUseCase,
    DownloadSpecialRetirementGrantCompleteAnalysisUseCase,
    DownloadSpecialRetirementGrantSimplifiedAnalysisUseCase,
  ],
})
export class SpecialRetirementGrantModule {
  protected readonly _type = SpecialRetirementGrantModule.name;
}
