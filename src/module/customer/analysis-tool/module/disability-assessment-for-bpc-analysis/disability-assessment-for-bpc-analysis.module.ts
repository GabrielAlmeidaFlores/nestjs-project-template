import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { DisabilityAssessmentForBpcAnalysisController } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.controller';
import { CreateDisabilityAssessmentForBpcAnalysisResultUseCase } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/use-case/create-disability-assessment-for-bpc-analysis-result.use-case';
import { CreateDisabilityAssessmentForBpcAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/use-case/create-disability-assessment-for-bpc-analysis.use-case';
import { DeleteDisabilityAssessmentForBpcAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/use-case/delete-disability-assessment-for-bpc-analysis.use-case';
import { DownloadDisabilityAssessmentForBpcCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/use-case/download-disability-assessment-for-bpc-complete-analysis.use-case';
import { DownloadDisabilityAssessmentForBpcSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/use-case/download-disability-assessment-for-bpc-simplified-analysis.use-case';
import { GetDisabilityAssessmentForBpcAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/use-case/get-disability-assessment-for-bpc-analysis.use-case';
import { UpdateDisabilityAssessmentForBpcAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/use-case/update-disability-assessment-for-bpc-analysis.use-case';
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
  ],
  controllers: [DisabilityAssessmentForBpcAnalysisController],
  providers: [
    CreateDisabilityAssessmentForBpcAnalysisUseCase,
    CreateDisabilityAssessmentForBpcAnalysisResultUseCase,
    GetDisabilityAssessmentForBpcAnalysisUseCase,
    DeleteDisabilityAssessmentForBpcAnalysisUseCase,
    DownloadDisabilityAssessmentForBpcCompleteAnalysisUseCase,
    DownloadDisabilityAssessmentForBpcSimplifiedAnalysisUseCase,
    UpdateDisabilityAssessmentForBpcAnalysisUseCase,
  ],
  exports: [DeleteDisabilityAssessmentForBpcAnalysisUseCase],
})
export class DisabilityAssessmentForBpcAnalysisModule {
  protected readonly _type = DisabilityAssessmentForBpcAnalysisModule.name;
}
