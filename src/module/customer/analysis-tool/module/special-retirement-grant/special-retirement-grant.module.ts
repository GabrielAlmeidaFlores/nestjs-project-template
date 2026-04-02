import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { CnisProcessorModule } from '@lib/cnis-processor/cnis-processor.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { SpecialRetirementGrantController } from '@module/customer/analysis-tool/module/special-retirement-grant/special-retirement-grant.controller';
import { CreateSpecialRetirementGrantCnisUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/create-special-retirement-grant-cnis.use-case';
import { CreateSpecialRetirementGrantResultUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/create-special-retirement-grant-result.use-case';
import { CreateSpecialRetirementGrantUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/create-special-retirement-grant.use-case';
import { DownloadSpecialRetirementGrantCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/download-special-retirement-grant-complete-analysis.use-case';
import { DownloadSpecialRetirementGrantSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/download-special-retirement-grant-simplified-analysis.use-case';
import { GetSpecialRetirementGrantUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/get-special-retirement-grant.use-case';
import { UpdateSpecialRetirementGrantUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/update-special-retirement-grant.use-case';
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
    CnisAnalyzerModule,
    CnisProcessorModule,
  ],
  controllers: [SpecialRetirementGrantController],
  providers: [
    CreateSpecialRetirementGrantUseCase,
    CreateSpecialRetirementGrantCnisUseCase,
    GetSpecialRetirementGrantUseCase,
    UpdateSpecialRetirementGrantUseCase,
    CreateSpecialRetirementGrantResultUseCase,
    DownloadSpecialRetirementGrantCompleteAnalysisUseCase,
    DownloadSpecialRetirementGrantSimplifiedAnalysisUseCase,
  ],
})
export class SpecialRetirementGrantModule {
  protected readonly _type = SpecialRetirementGrantModule.name;
}
