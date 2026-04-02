import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisActivityTrackerModule } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { OrganizationCustomizationExportDocumentOptionsResolverModule } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options-resolver.module';
import { MedicalAndSocialReportObjectionGeneratorAnalysisController } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.controller';
import { CreateMedicalAndSocialReportObjectionGeneratorAnalysisResultUseCase } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/use-case/create-medical-and-social-report-objection-generator-analysis-result.use-case';
import { CreateMedicalAndSocialReportObjectionGeneratorAnalysisUseCase } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/use-case/create-medical-and-social-report-objection-generator-analysis.use-case';
import { DeleteMedicalAndSocialReportObjectionGeneratorAnalysisUseCase } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/use-case/delete-medical-and-social-report-objection-generator-analysis.use-case';
import { DownloadMedicalAndSocialReportObjectionGeneratorCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/use-case/download-medical-and-social-report-objection-generator-complete-analysis.use-case';
import { DownloadMedicalAndSocialReportObjectionGeneratorSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/use-case/download-medical-and-social-report-objection-generator-simplified-analysis.use-case';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisUseCase } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/use-case/get-medical-and-social-report-objection-generator-analysis.use-case';
import { UpdateMedicalAndSocialReportObjectionGeneratorAnalysisUseCase } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/use-case/update-medical-and-social-report-objection-generator-analysis.use-case';
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
  controllers: [MedicalAndSocialReportObjectionGeneratorAnalysisController],
  providers: [
    CreateMedicalAndSocialReportObjectionGeneratorAnalysisUseCase,
    CreateMedicalAndSocialReportObjectionGeneratorAnalysisResultUseCase,
    GetMedicalAndSocialReportObjectionGeneratorAnalysisUseCase,
    DownloadMedicalAndSocialReportObjectionGeneratorCompleteAnalysisUseCase,
    DownloadMedicalAndSocialReportObjectionGeneratorSimplifiedAnalysisUseCase,
    UpdateMedicalAndSocialReportObjectionGeneratorAnalysisUseCase,
    DeleteMedicalAndSocialReportObjectionGeneratorAnalysisUseCase,
  ],
  exports: [DeleteMedicalAndSocialReportObjectionGeneratorAnalysisUseCase],
})
export class MedicalAndSocialReportObjectionGeneratorAnalysisModule {
  protected readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisModule.name;
}
