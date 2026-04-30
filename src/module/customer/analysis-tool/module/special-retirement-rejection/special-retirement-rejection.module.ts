import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { CnisProcessorModule } from '@lib/cnis-processor/cnis-processor.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { SpecialRetirementRejectionController } from '@module/customer/analysis-tool/module/special-retirement-rejection/special-retirement-rejection.controller';
import { CreateSpecialRetirementRejectionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/special-retirement-rejection/use-case/create-special-retirement-rejection-first-analysis.use-case';
import { CreateSpecialRetirementRejectionResultUseCase } from '@module/customer/analysis-tool/module/special-retirement-rejection/use-case/create-special-retirement-rejection-result.use-case';
import { CreateSpecialRetirementRejectionUseCase } from '@module/customer/analysis-tool/module/special-retirement-rejection/use-case/create-special-retirement-rejection.use-case';
import { DownloadSpecialRetirementRejectionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/special-retirement-rejection/use-case/download-special-retirement-rejection-complete-analysis.use-case';
import { DownloadSpecialRetirementRejectionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/special-retirement-rejection/use-case/download-special-retirement-rejection-simplified-analysis.use-case';
import { GetSpecialRetirementRejectionUseCase } from '@module/customer/analysis-tool/module/special-retirement-rejection/use-case/get-special-retirement-rejection.use-case';
import { UpdateSpecialRetirementRejectionWorkPeriodsUseCase } from '@module/customer/analysis-tool/module/special-retirement-rejection/use-case/update-special-retirement-rejection-work-periods.use-case';
import { UpdateSpecialRetirementRejectionUseCase } from '@module/customer/analysis-tool/module/special-retirement-rejection/use-case/update-special-retirement-rejection.use-case';
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
    AnalysisProcessorModule,
    ExportDocumentModule,
    CnisAnalyzerModule,
    CnisProcessorModule,
  ],
  controllers: [SpecialRetirementRejectionController],
  providers: [
    CreateSpecialRetirementRejectionUseCase,
    GetSpecialRetirementRejectionUseCase,
    UpdateSpecialRetirementRejectionUseCase,
    UpdateSpecialRetirementRejectionWorkPeriodsUseCase,
    CreateSpecialRetirementRejectionFirstAnalysisUseCase,
    CreateSpecialRetirementRejectionResultUseCase,
    DownloadSpecialRetirementRejectionCompleteAnalysisUseCase,
    DownloadSpecialRetirementRejectionSimplifiedAnalysisUseCase,
  ],
})
export class SpecialRetirementRejectionModule {
  protected readonly _type = SpecialRetirementRejectionModule.name;
}
