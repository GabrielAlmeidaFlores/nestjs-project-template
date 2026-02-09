import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { PerCapitaIncomeForBpcAnalysisController } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.controller';
import { CreatePerCapitaIncomeForBpcAnalysisFamilyMemberUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/create-per-capita-income-for-bpc-analysis-family-member.use-case';
import { CreatePerCapitaIncomeForBpcAnalysisResultUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/create-per-capita-income-for-bpc-analysis-result.use-case';
import { CreatePerCapitaIncomeForBpcAnalysisUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/create-per-capita-income-for-bpc-analysis.use-case';
import { DeletePerCapitaIncomeForBpcAnalysisUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/delete-per-capita-income-for-bpc-analysis.use-case';
import { DownloadPerCapitaIncomeForBpcCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/download-per-capita-income-for-bpc-complete-analysis.use-case';
import { DownloadPerCapitaIncomeForBpcSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/download-per-capita-income-for-bpc-simplified-analysis.use-case';
import { GetPerCapitaIncomeForBpcAnalysisUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/get-per-capita-income-for-bpc-analysis.use-case';
import { UpdatePerCapitaIncomeForBpcAnalysisFamilyMemberUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/update-per-capita-income-for-bpc-analysis-family-member.use-case';
import { UpdatePerCapitaIncomeForBpcAnalysisUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/update-per-capita-income-for-bpc-analysis.use-case';
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
  controllers: [PerCapitaIncomeForBpcAnalysisController],
  providers: [
    CreatePerCapitaIncomeForBpcAnalysisUseCase,
    CreatePerCapitaIncomeForBpcAnalysisFamilyMemberUseCase,
    CreatePerCapitaIncomeForBpcAnalysisResultUseCase,
    DeletePerCapitaIncomeForBpcAnalysisUseCase,
    UpdatePerCapitaIncomeForBpcAnalysisFamilyMemberUseCase,
    UpdatePerCapitaIncomeForBpcAnalysisUseCase,
    GetPerCapitaIncomeForBpcAnalysisUseCase,
    DownloadPerCapitaIncomeForBpcCompleteAnalysisUseCase,
    DownloadPerCapitaIncomeForBpcSimplifiedAnalysisUseCase,
  ],
  exports: [DeletePerCapitaIncomeForBpcAnalysisUseCase],
})
export class PerCapitaIncomeForBpcAnalysisModule {
  protected readonly _type = PerCapitaIncomeForBpcAnalysisModule.name;
}
