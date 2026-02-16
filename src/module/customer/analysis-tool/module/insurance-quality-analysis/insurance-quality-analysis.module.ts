import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { InsuranceQualityAnalysisController } from '@module/customer/analysis-tool/module/insurance-quality-analysis/insurance-quality-analysis.controller';
import { CreateInsuranceQualityAnalysisResultUseCase } from '@module/customer/analysis-tool/module/insurance-quality-analysis/use-case/create-insurance-quality-analysis-result.use-case';
import { CreateInsuranceQualityAnalysisUseCase } from '@module/customer/analysis-tool/module/insurance-quality-analysis/use-case/create-insurance-quality-analysis.use-case';
import { DownloadInsuranceQualityAnalysisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/insurance-quality-analysis/use-case/download-insurance-quality-analysis-complete-analysis.use-case';
import { DownloadInsuranceQualityAnalysisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/insurance-quality-analysis/use-case/download-insurance-quality-analysis-simplified-analysis.use-case';
import { GetInsuranceQualityAnalysisUseCase } from '@module/customer/analysis-tool/module/insurance-quality-analysis/use-case/get-insurance-quality-analysis.use-case';
import { UpdateInsuranceQualityAnalysisUseCase } from '@module/customer/analysis-tool/module/insurance-quality-analysis/use-case/update-insurance-quality-analysis.use-case';
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
    GenerativeIaModule,
  ],
  controllers: [InsuranceQualityAnalysisController],
  providers: [
    CreateInsuranceQualityAnalysisUseCase,
    UpdateInsuranceQualityAnalysisUseCase,
    GetInsuranceQualityAnalysisUseCase,
    CreateInsuranceQualityAnalysisResultUseCase,
    DownloadInsuranceQualityAnalysisCompleteAnalysisUseCase,
    DownloadInsuranceQualityAnalysisSimplifiedAnalysisUseCase,
  ],
  exports: [
    CreateInsuranceQualityAnalysisUseCase,
    UpdateInsuranceQualityAnalysisUseCase,
    GetInsuranceQualityAnalysisUseCase,
    CreateInsuranceQualityAnalysisResultUseCase,
    DownloadInsuranceQualityAnalysisCompleteAnalysisUseCase,
    DownloadInsuranceQualityAnalysisSimplifiedAnalysisUseCase,
  ],
})
export class InsuranceQualityAnalysisModule {
  protected readonly _type = InsuranceQualityAnalysisModule.name;
}
