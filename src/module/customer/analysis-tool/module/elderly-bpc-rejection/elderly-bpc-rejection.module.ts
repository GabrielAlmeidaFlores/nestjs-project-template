import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { AccountModule } from '@module/customer/account/account.module';
import { OrganizationSessionModule } from '@module/customer/account/lib/organization-session/organization-session.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { ElderlyBpcRejectionController } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/elderly-bpc-rejection.controller';
import { CreateElderlyBpcRejectionResultUseCase } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/use-case/create-elderly-bpc-rejection-result.use-case';
import { CreateElderlyBpcRejectionUseCase } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/use-case/create-elderly-bpc-rejection.use-case';
import { DownloadElderlyBpcRejectionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/use-case/download-elderly-bpc-rejection-complete-analysis.use-case';
import { DownloadElderlyBpcRejectionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/use-case/download-elderly-bpc-rejection-simplified-analysis.use-case';
import { GetElderlyBpcRejectionUseCase } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/use-case/get-elderly-bpc-rejection.use-case';
import { UpdateElderlyBpcRejectionUseCase } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/use-case/update-elderly-bpc-rejection.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    ExportDocumentModule,
    AccountModule,
    CnisAnalyzerModule,
    AnalysisProcessorModule,
    FileProcessorModule,
    OrganizationCreditModule,
    OrganizationSessionModule,

    PaymentPlanModule,
  ],
  controllers: [ElderlyBpcRejectionController],
  providers: [
    CreateElderlyBpcRejectionUseCase,
    UpdateElderlyBpcRejectionUseCase,
    GetElderlyBpcRejectionUseCase,
    CreateElderlyBpcRejectionResultUseCase,
    DownloadElderlyBpcRejectionCompleteAnalysisUseCase,
    DownloadElderlyBpcRejectionSimplifiedAnalysisUseCase,
  ],
})
export class ElderlyBpcRejectionModule {
  protected readonly _type = ElderlyBpcRejectionModule.name;
}
