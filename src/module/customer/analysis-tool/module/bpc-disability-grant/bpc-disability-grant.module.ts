import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisActivityTrackerModule } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { OrganizationCustomizationExportDocumentOptionsResolverModule } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options-resolver.module';
import { BpcDisabilityGrantController } from '@module/customer/analysis-tool/module/bpc-disability-grant/bpc-disability-grant.controller';
import { CreateBpcDisabilityGrantFamilyMemberUseCase } from '@module/customer/analysis-tool/module/bpc-disability-grant/use-case/create-bpc-disability-grant-family-member.use-case';
import { CreateBpcDisabilityGrantResultUseCase } from '@module/customer/analysis-tool/module/bpc-disability-grant/use-case/create-bpc-disability-grant-result.use-case';
import { CreateBpcDisabilityGrantUseCase } from '@module/customer/analysis-tool/module/bpc-disability-grant/use-case/create-bpc-disability-grant.use-case';
import { DownloadBpcDisabilityGrantCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-disability-grant/use-case/download-bpc-disability-grant-complete-analysis.use-case';
import { DownloadBpcDisabilityGrantSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-disability-grant/use-case/download-bpc-disability-grant-simplified-analysis.use-case';
import { GetBpcDisabilityGrantUseCase } from '@module/customer/analysis-tool/module/bpc-disability-grant/use-case/get-bpc-disability-grant.use-case';
import { UpdateBpcDisabilityGrantFamilyMemberUseCase } from '@module/customer/analysis-tool/module/bpc-disability-grant/use-case/update-bpc-disability-grant-family-member.use-case';
import { UpdateBpcDisabilityGrantUseCase } from '@module/customer/analysis-tool/module/bpc-disability-grant/use-case/update-bpc-disability-grant.use-case';
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
  controllers: [BpcDisabilityGrantController],
  providers: [
    CreateBpcDisabilityGrantUseCase,
    CreateBpcDisabilityGrantFamilyMemberUseCase,
    UpdateBpcDisabilityGrantFamilyMemberUseCase,
    CreateBpcDisabilityGrantResultUseCase,
    GetBpcDisabilityGrantUseCase,
    DownloadBpcDisabilityGrantCompleteAnalysisUseCase,
    DownloadBpcDisabilityGrantSimplifiedAnalysisUseCase,
    UpdateBpcDisabilityGrantUseCase,
  ],
})
export class BpcDisabilityGrantModule {
  protected readonly _type = BpcDisabilityGrantModule.name;
}
