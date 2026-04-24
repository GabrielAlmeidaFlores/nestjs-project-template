import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisActivityTrackerModule } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { OrganizationCustomizationExportDocumentOptionsResolverModule } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options-resolver.module';
import { BpcDisabilityDenialController } from '@module/customer/analysis-tool/module/bpc-disability-denial/bpc-disability-denial.controller';
import { CreateBpcDisabilityDenialDocumentUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/create-bpc-disability-denial-document.use-case';
import { CreateBpcDisabilityDenialFamilyMemberUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/create-bpc-disability-denial-family-member.use-case';
import { CreateBpcDisabilityDenialFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/create-bpc-disability-denial-first-analysis.use-case';
import { CreateBpcDisabilityDenialInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/create-bpc-disability-denial-inss-decision-analysis.use-case';
import { CreateBpcDisabilityDenialResultUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/create-bpc-disability-denial-result.use-case';
import { CreateBpcDisabilityDenialUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/create-bpc-disability-denial.use-case';
import { DownloadBpcDisabilityDenialCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/download-bpc-disability-denial-complete-analysis.use-case';
import { DownloadBpcDisabilityDenialSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/download-bpc-disability-denial-simplified-analysis.use-case';
import { GetBpcDisabilityDenialUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/get-bpc-disability-denial.use-case';
import { UpdateBpcDisabilityDenialFamilyMemberUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/update-bpc-disability-denial-family-member.use-case';
import { UpdateBpcDisabilityDenialUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/update-bpc-disability-denial.use-case';
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
  controllers: [BpcDisabilityDenialController],
  providers: [
    CreateBpcDisabilityDenialUseCase,
    CreateBpcDisabilityDenialDocumentUseCase,
    CreateBpcDisabilityDenialFamilyMemberUseCase,
    UpdateBpcDisabilityDenialFamilyMemberUseCase,
    CreateBpcDisabilityDenialInssDecisionAnalysisUseCase,
    CreateBpcDisabilityDenialFirstAnalysisUseCase,
    CreateBpcDisabilityDenialResultUseCase,
    GetBpcDisabilityDenialUseCase,
    DownloadBpcDisabilityDenialCompleteAnalysisUseCase,
    DownloadBpcDisabilityDenialSimplifiedAnalysisUseCase,
    UpdateBpcDisabilityDenialUseCase,
  ],
})
export class BpcDisabilityDenialModule {
  protected readonly _type = BpcDisabilityDenialModule.name;
}
