import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { AdministrativeProcedureInssAnalysisController } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.controller';
import { CreateAdministrativeProcedureInssAnalysisResultUseCase } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/use-case/create-administrative-procedure-inss-analysis-result.use-case';
import { CreateAdministrativeProcedureInssAnalysisUseCase } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/use-case/create-administrative-procedure-inss-analysis.use-case';
import { DeleteAdministrativeProcedureInssAnalysisUseCase } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/use-case/delete-administrative-procedure-inss-analysis.use-case';
import { DownloadAdministrativeProcedureInssCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/use-case/download-administrative-procedure-inss-complete-analysis.use-case';
import { DownloadAdministrativeProcedureInssSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/use-case/download-administrative-procedure-inss-simplified-analysis.use-case';
import { GetAdministrativeProcedureInssAnalysisUseCase } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/use-case/get-administrative-procedure-inss-analysis.use-case';
import { UpdateAdministrativeProcedureInssAnalysisUseCase } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/use-case/update-administrative-procedure-inss-analysis.use-case';
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
  controllers: [AdministrativeProcedureInssAnalysisController],
  providers: [
    CreateAdministrativeProcedureInssAnalysisUseCase,
    CreateAdministrativeProcedureInssAnalysisResultUseCase,
    GetAdministrativeProcedureInssAnalysisUseCase,
    DeleteAdministrativeProcedureInssAnalysisUseCase,
    DownloadAdministrativeProcedureInssCompleteAnalysisUseCase,
    DownloadAdministrativeProcedureInssSimplifiedAnalysisUseCase,
    UpdateAdministrativeProcedureInssAnalysisUseCase,
  ],
  exports: [DeleteAdministrativeProcedureInssAnalysisUseCase],
})
export class AdministrativeProcedureInssAnalysisModule {
  protected readonly _type = AdministrativeProcedureInssAnalysisModule.name;
}
