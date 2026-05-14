import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { AnalysisActivityTrackerModule } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { CnisXRayAnalysisModule } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/cnis-x-ray-analysis.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { OrganizationCustomizationExportDocumentOptionsResolverModule } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options-resolver.module';
import { RetirementPermanentDisabilityRevisionController } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/retirement-permanent-disability-revision.controller';
import { CreateRetirementPermanentDisabilityRevisionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/create-retirement-permanent-disability-revision-first-analysis.use-case';
import { CreateRetirementPermanentDisabilityRevisionResultUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/create-retirement-permanent-disability-revision-result.use-case';
import { CreateRetirementPermanentDisabilityRevisionWorkPeriodsUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/create-retirement-permanent-disability-revision-work-periods.use-case';
import { CreateRetirementPermanentDisabilityRevisionUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/create-retirement-permanent-disability-revision.use-case';
import { DisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/disability-analysis.use-case';
import { DownloadRetirementPermanentDisabilityRevisionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/download-retirement-permanent-disability-revision-complete-analysis.use-case';
import { DownloadRetirementPermanentDisabilityRevisionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/download-retirement-permanent-disability-revision-simplified-analysis.use-case';
import { GetRetirementPermanentDisabilityRevisionUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/get-retirement-permanent-disability-revision.use-case';
import { ResolveRetirementPermanentDisabilityRevisionConcessionLetterBreakdownPendencyUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/resolve-retirement-permanent-disability-revision-concession-letter-breakdown-pendency.use-case';
import { ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/resolve-retirement-permanent-disability-revision-work-periods-pendency.use-case';
import { CreateRetirementPermanentDisabilityRevisionWorkPeriodDocumentAnalysisUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/create-retirement-permanent-disability-revision-work-period-document-analysis.use-case';
import { UpdateRetirementPermanentDisabilityRevisionWorkPeriodsUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/update-retirement-permanent-disability-revision-work-periods.use-case';
import { UpdateRetirementPermanentDisabilityRevisionUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/update-retirement-permanent-disability-revision.use-case';
import { UploadRetirementPermanentDisabilityRevisionDocumentsUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/upload-retirement-permanent-disability-revision-documents.use-case';
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
    CnisXRayAnalysisModule,
    AnalysisActivityTrackerModule,
    AnalysisProcessorModule,
    ExportDocumentModule,
    OrganizationCustomizationExportDocumentOptionsResolverModule,
  ],
  controllers: [RetirementPermanentDisabilityRevisionController],
  providers: [
    CreateRetirementPermanentDisabilityRevisionUseCase,
    CreateRetirementPermanentDisabilityRevisionResultUseCase,
    CreateRetirementPermanentDisabilityRevisionFirstAnalysisUseCase,
    GetRetirementPermanentDisabilityRevisionUseCase,
    DownloadRetirementPermanentDisabilityRevisionCompleteAnalysisUseCase,
    DownloadRetirementPermanentDisabilityRevisionSimplifiedAnalysisUseCase,
    UploadRetirementPermanentDisabilityRevisionDocumentsUseCase,
    UpdateRetirementPermanentDisabilityRevisionUseCase,
    DisabilityAnalysisUseCase,
    CreateRetirementPermanentDisabilityRevisionWorkPeriodsUseCase,
    UpdateRetirementPermanentDisabilityRevisionWorkPeriodsUseCase,
    ResolveRetirementPermanentDisabilityRevisionConcessionLetterBreakdownPendencyUseCase,
    ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyUseCase,
    CreateRetirementPermanentDisabilityRevisionWorkPeriodDocumentAnalysisUseCase,
  ],
  exports: [],
})
export class RetirementPermanentDisabilityRevisionModule {
  protected readonly _type = RetirementPermanentDisabilityRevisionModule.name;
}
