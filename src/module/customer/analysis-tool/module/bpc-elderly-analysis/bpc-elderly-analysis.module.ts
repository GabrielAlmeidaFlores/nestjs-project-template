import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisActivityTrackerModule } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { OrganizationCustomizationExportDocumentOptionsResolverModule } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options-resolver.module';
import { BpcElderlyAnalysisController } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/bpc-elderly-analysis.controller';
import { CreateBpcElderlyAnalysisDocumentUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/use-case/create-bpc-elderly-analysis-document.use-case';
import { CreateBpcElderlyAnalysisFamilyMemberUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/use-case/create-bpc-elderly-analysis-family-member.use-case';
import { CreateBpcElderlyAnalysisResultUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/use-case/create-bpc-elderly-analysis-result.use-case';
import { CreateBpcElderlyAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/use-case/create-bpc-elderly-analysis.use-case';
import { DownloadBpcElderlyAnalysisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/use-case/download-bpc-elderly-analysis-complete-analysis.use-case';
import { DownloadBpcElderlyAnalysisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/use-case/download-bpc-elderly-analysis-simplified-analysis.use-case';
import { GetBpcElderlyAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/use-case/get-bpc-elderly-analysis.use-case';
import { UpdateBpcElderlyAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/use-case/update-bpc-elderly-analysis.use-case';
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
    AnalysisActivityTrackerModule,
    AnalysisProcessorModule,
    ExportDocumentModule,
    OrganizationCustomizationExportDocumentOptionsResolverModule,
  ],
  controllers: [BpcElderlyAnalysisController],
  providers: [
    CreateBpcElderlyAnalysisUseCase,
    CreateBpcElderlyAnalysisDocumentUseCase,
    CreateBpcElderlyAnalysisFamilyMemberUseCase,
    CreateBpcElderlyAnalysisResultUseCase,
    GetBpcElderlyAnalysisUseCase,
    DownloadBpcElderlyAnalysisCompleteAnalysisUseCase,
    DownloadBpcElderlyAnalysisSimplifiedAnalysisUseCase,
    UpdateBpcElderlyAnalysisUseCase,
  ],
})
export class BpcElderlyAnalysisModule {
  protected readonly _type = BpcElderlyAnalysisModule.name;
}
