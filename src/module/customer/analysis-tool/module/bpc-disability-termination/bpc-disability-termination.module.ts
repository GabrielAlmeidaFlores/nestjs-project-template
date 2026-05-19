import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisActivityTrackerModule } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { OrganizationCustomizationExportDocumentOptionsResolverModule } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options-resolver.module';
import { BpcDisabilityTerminationController } from '@module/customer/analysis-tool/module/bpc-disability-termination/bpc-disability-termination.controller';
import { CreateBpcDisabilityTerminationInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/create-bpc-disability-termination-inss-decision-analysis.use-case';
import { CreateBpcDisabilityTerminationResultUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/create-bpc-disability-termination-result.use-case';
import { CreateBpcDisabilityTerminationUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/create-bpc-disability-termination.use-case';
import { DownloadBpcDisabilityTerminationCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/download-bpc-disability-termination-complete-analysis.use-case';
import { DownloadBpcDisabilityTerminationSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/download-bpc-disability-termination-simplified-analysis.use-case';
import { GetBpcDisabilityTerminationUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/get-bpc-disability-termination.use-case';
import { SaveBpcDisabilityTerminationDisabilityAssessmentUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/save-bpc-disability-termination-disability-assessment.use-case';
import { SaveBpcDisabilityTerminationDocumentsUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/save-bpc-disability-termination-documents.use-case';
import { SaveBpcDisabilityTerminationFamilyMembersUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/save-bpc-disability-termination-family-members.use-case';
import { UpdateBpcDisabilityTerminationUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/update-bpc-disability-termination.use-case';
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
  controllers: [BpcDisabilityTerminationController],
  providers: [
    CreateBpcDisabilityTerminationUseCase,
    SaveBpcDisabilityTerminationDocumentsUseCase,
    SaveBpcDisabilityTerminationFamilyMembersUseCase,
    SaveBpcDisabilityTerminationDisabilityAssessmentUseCase,
    CreateBpcDisabilityTerminationInssDecisionAnalysisUseCase,
    CreateBpcDisabilityTerminationResultUseCase,
    GetBpcDisabilityTerminationUseCase,
    DownloadBpcDisabilityTerminationCompleteAnalysisUseCase,
    DownloadBpcDisabilityTerminationSimplifiedAnalysisUseCase,
    UpdateBpcDisabilityTerminationUseCase,
  ],
})
export class BpcDisabilityTerminationModule {
  protected readonly _type = BpcDisabilityTerminationModule.name;
}
