import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisActivityTrackerModule } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { OrganizationCustomizationExportDocumentOptionsResolverModule } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options-resolver.module';
import { BpcElderlyCessationController } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/bpc-elderly-cessation.controller';
import { CreateBpcElderlyCessationDocumentUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/create-bpc-elderly-cessation-document.use-case';
import { CreateBpcElderlyCessationFamilyMemberUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/create-bpc-elderly-cessation-family-member.use-case';
import { CreateBpcElderlyCessationFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/create-bpc-elderly-cessation-first-analysis.use-case';
import { CreateBpcElderlyCessationInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/create-bpc-elderly-cessation-inss-decision-analysis.use-case';
import { CreateBpcElderlyCessationResultUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/create-bpc-elderly-cessation-result.use-case';
import { CreateBpcElderlyCessationUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/create-bpc-elderly-cessation.use-case';
import { DownloadBpcElderlyCessationCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/download-bpc-elderly-cessation-complete-analysis.use-case';
import { DownloadBpcElderlyCessationSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/download-bpc-elderly-cessation-simplified-analysis.use-case';
import { GetBpcElderlyCessationUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/get-bpc-elderly-cessation.use-case';
import { UpdateBpcElderlyCessationFamilyMemberUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/update-bpc-elderly-cessation-family-member.use-case';
import { UpdateBpcElderlyCessationUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/update-bpc-elderly-cessation.use-case';
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
  controllers: [BpcElderlyCessationController],
  providers: [
    CreateBpcElderlyCessationUseCase,
    CreateBpcElderlyCessationDocumentUseCase,
    CreateBpcElderlyCessationFamilyMemberUseCase,
    UpdateBpcElderlyCessationFamilyMemberUseCase,
    CreateBpcElderlyCessationInssDecisionAnalysisUseCase,
    CreateBpcElderlyCessationFirstAnalysisUseCase,
    CreateBpcElderlyCessationResultUseCase,
    GetBpcElderlyCessationUseCase,
    DownloadBpcElderlyCessationCompleteAnalysisUseCase,
    DownloadBpcElderlyCessationSimplifiedAnalysisUseCase,
    UpdateBpcElderlyCessationUseCase,
  ],
})
export class BpcElderlyCessationModule {
  protected readonly _type = BpcElderlyCessationModule.name;
}
