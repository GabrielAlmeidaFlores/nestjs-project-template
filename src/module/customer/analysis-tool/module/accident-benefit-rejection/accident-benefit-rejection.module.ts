import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { AccidentBenefitRejectionController } from '@module/customer/analysis-tool/module/accident-benefit-rejection/accident-benefit-rejection.controller';
import { CreateAccidentBenefitRejectionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/accident-benefit-rejection/use-case/create-accident-benefit-rejection-first-analysis.use-case';
import { CreateAccidentBenefitRejectionResultUseCase } from '@module/customer/analysis-tool/module/accident-benefit-rejection/use-case/create-accident-benefit-rejection-result.use-case';
import { CreateAccidentBenefitRejectionSecondAnalysisUseCase } from '@module/customer/analysis-tool/module/accident-benefit-rejection/use-case/create-accident-benefit-rejection-second-analysis.use-case';
import { CreateAccidentBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/accident-benefit-rejection/use-case/create-accident-benefit-rejection.use-case';
import { DownloadAccidentBenefitRejectionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/accident-benefit-rejection/use-case/download-accident-benefit-rejection-complete-analysis.use-case';
import { DownloadAccidentBenefitRejectionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/accident-benefit-rejection/use-case/download-accident-benefit-rejection-simplified-analysis.use-case';
import { GetAccidentBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/accident-benefit-rejection/use-case/get-accident-benefit-rejection.use-case';
import { UpdateAccidentBenefitRejectionWorkPeriodsUseCase } from '@module/customer/analysis-tool/module/accident-benefit-rejection/use-case/update-accident-benefit-rejection-work-periods.use-case';
import { UpdateAccidentBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/accident-benefit-rejection/use-case/update-accident-benefit-rejection.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    AnalysisProcessorModule,
    ExportDocumentModule,
    OrganizationSessionModule,
    OrganizationCreditModule,
    PaymentPlanModule,
    FileProcessorModule,
    CnisAnalyzerModule,
  ],
  controllers: [AccidentBenefitRejectionController],
  providers: [
    CreateAccidentBenefitRejectionUseCase,
    GetAccidentBenefitRejectionUseCase,
    UpdateAccidentBenefitRejectionUseCase,
    UpdateAccidentBenefitRejectionWorkPeriodsUseCase,
    CreateAccidentBenefitRejectionFirstAnalysisUseCase,
    CreateAccidentBenefitRejectionSecondAnalysisUseCase,
    CreateAccidentBenefitRejectionResultUseCase,
    DownloadAccidentBenefitRejectionCompleteAnalysisUseCase,
    DownloadAccidentBenefitRejectionSimplifiedAnalysisUseCase,
  ],
})
export class AccidentBenefitRejectionModule {
  protected readonly _type = AccidentBenefitRejectionModule.name;
}
