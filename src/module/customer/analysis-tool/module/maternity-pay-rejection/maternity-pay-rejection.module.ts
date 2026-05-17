import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { CnisXRayAnalysisModule } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/cnis-x-ray-analysis.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { MaternityPayRejectionController } from '@module/customer/analysis-tool/module/maternity-pay-rejection/maternity-pay-rejection.controller';
import { CreateMaternityPayRejectionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/maternity-pay-rejection/use-case/create-maternity-pay-rejection-first-analysis.use-case';
import { CreateMaternityPayRejectionResultUseCase } from '@module/customer/analysis-tool/module/maternity-pay-rejection/use-case/create-maternity-pay-rejection-result.use-case';
import { CreateMaternityPayRejectionSecondAnalysisUseCase } from '@module/customer/analysis-tool/module/maternity-pay-rejection/use-case/create-maternity-pay-rejection-second-analysis.use-case';
import { CreateMaternityPayRejectionUseCase } from '@module/customer/analysis-tool/module/maternity-pay-rejection/use-case/create-maternity-pay-rejection.use-case';
import { DownloadMaternityPayRejectionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/maternity-pay-rejection/use-case/download-maternity-pay-rejection-complete-analysis.use-case';
import { DownloadMaternityPayRejectionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/maternity-pay-rejection/use-case/download-maternity-pay-rejection-simplified-analysis.use-case';
import { GetMaternityPayRejectionUseCase } from '@module/customer/analysis-tool/module/maternity-pay-rejection/use-case/get-maternity-pay-rejection.use-case';
import { UpdateMaternityPayRejectionWorkPeriodsUseCase } from '@module/customer/analysis-tool/module/maternity-pay-rejection/use-case/update-maternity-pay-rejection-work-periods.use-case';
import { UpdateMaternityPayRejectionUseCase } from '@module/customer/analysis-tool/module/maternity-pay-rejection/use-case/update-maternity-pay-rejection.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    AnalysisProcessorModule,
    CnisXRayAnalysisModule,
    ExportDocumentModule,
    OrganizationSessionModule,
    OrganizationCreditModule,
    PaymentPlanModule,
    FileProcessorModule,
    CnisAnalyzerModule,
  ],
  controllers: [MaternityPayRejectionController],
  providers: [
    CreateMaternityPayRejectionUseCase,
    GetMaternityPayRejectionUseCase,
    UpdateMaternityPayRejectionUseCase,
    UpdateMaternityPayRejectionWorkPeriodsUseCase,
    CreateMaternityPayRejectionFirstAnalysisUseCase,
    CreateMaternityPayRejectionSecondAnalysisUseCase,
    CreateMaternityPayRejectionResultUseCase,
    DownloadMaternityPayRejectionCompleteAnalysisUseCase,
    DownloadMaternityPayRejectionSimplifiedAnalysisUseCase,
  ],
})
export class MaternityPayRejectionModule {
  protected readonly _type = MaternityPayRejectionModule.name;
}
