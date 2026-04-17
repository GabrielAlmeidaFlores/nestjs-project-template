import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { DatabaseModule } from '@infra/database/database.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { MaternityPayGrantController } from '@module/customer/analysis-tool/module/maternity-pay-grant/maternity-pay-grant.controller';
import { CreateMaternityPayGrantFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/create-maternity-pay-grant-first-analysis.use-case';
import { CreateMaternityPayGrantPeriodUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/create-maternity-pay-grant-period.use-case';
import { CreateMaternityPayGrantResultUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/create-maternity-pay-grant-result.use-case';
import { CreateMaternityPayGrantUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/create-maternity-pay-grant.use-case';
import { DeleteMaternityPayGrantPeriodUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/delete-maternity-pay-grant-period.use-case';
import { DownloadMaternityPayGrantCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/download-maternity-pay-grant-complete-analysis.use-case';
import { DownloadMaternityPayGrantSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/download-maternity-pay-grant-simplified-analysis.use-case';
import { GetMaternityPayGrantUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/get-maternity-pay-grant.use-case';
import { UpdateMaternityPayGrantPeriodUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/update-maternity-pay-grant-period.use-case';
import { UpdateMaternityPayGrantUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/update-maternity-pay-grant.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    BucketModule,
    DatabaseModule,
    AnalysisProcessorModule,
    ExportDocumentModule,
    FileProcessorModule,
    OrganizationSessionModule,
    OrganizationCreditModule,
    PaymentPlanModule,
    CnisAnalyzerModule,
  ],
  controllers: [MaternityPayGrantController],
  providers: [
    CreateMaternityPayGrantUseCase,
    GetMaternityPayGrantUseCase,
    UpdateMaternityPayGrantUseCase,
    CreateMaternityPayGrantPeriodUseCase,
    UpdateMaternityPayGrantPeriodUseCase,
    DeleteMaternityPayGrantPeriodUseCase,
    CreateMaternityPayGrantFirstAnalysisUseCase,
    CreateMaternityPayGrantResultUseCase,
    DownloadMaternityPayGrantCompleteAnalysisUseCase,
    DownloadMaternityPayGrantSimplifiedAnalysisUseCase,
  ],
})
export class MaternityPayGrantModule {
  protected readonly _type = MaternityPayGrantModule.name;
}
