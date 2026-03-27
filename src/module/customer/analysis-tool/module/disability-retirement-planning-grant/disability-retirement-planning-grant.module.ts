import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { DisabilityRetirementPlanningGrantController } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/disability-retirement-planning-grant.controller';
import { AnalyzeDisabilityRetirementPlanningGrantPppUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/analyze-disability-retirement-planning-grant-ppp.use-case';
import { AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/analyze-disability-retirement-planning-grant-time-accelerator.use-case';
import { CreateDisabilityRetirementPlanningGrantDisabilityPeriodUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/create-disability-retirement-planning-grant-disability-period.use-case';
import { CreateDisabilityRetirementPlanningGrantFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/create-disability-retirement-planning-grant-first-analysis.use-case';
import { CreateDisabilityRetirementPlanningGrantPeriodUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/create-disability-retirement-planning-grant-period.use-case';
import { CreateDisabilityRetirementPlanningGrantResultUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/create-disability-retirement-planning-grant-result.use-case';
import { CreateDisabilityRetirementPlanningGrantUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/create-disability-retirement-planning-grant.use-case';
import { DeleteDisabilityRetirementPlanningGrantDisabilityPeriodUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/delete-disability-retirement-planning-grant-disability-period.use-case';
import { DeleteDisabilityRetirementPlanningGrantPeriodUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/delete-disability-retirement-planning-grant-period.use-case';
import { DeleteDisabilityRetirementPlanningGrantTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/delete-disability-retirement-planning-grant-time-accelerator.use-case';
import { DownloadDisabilityRetirementPlanningGrantCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/download-disability-retirement-planning-grant-complete-analysis.use-case';
import { DownloadDisabilityRetirementPlanningGrantSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/download-disability-retirement-planning-grant-simplified-analysis.use-case';
import { GetDisabilityRetirementPlanningGrantUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/get-disability-retirement-planning-grant.use-case';
import { UpdateDisabilityRetirementPlanningGrantDisabilityPeriodUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/update-disability-retirement-planning-grant-disability-period.use-case';
import { UpdateDisabilityRetirementPlanningGrantPeriodUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/update-disability-retirement-planning-grant-period.use-case';
import { UpdateDisabilityRetirementPlanningGrantTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/update-disability-retirement-planning-grant-time-accelerator.use-case';
import { UpdateDisabilityRetirementPlanningGrantUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/update-disability-retirement-planning-grant.use-case';
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
  controllers: [DisabilityRetirementPlanningGrantController],
  providers: [
    AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorUseCase,
    AnalyzeDisabilityRetirementPlanningGrantPppUseCase,
    CreateDisabilityRetirementPlanningGrantDisabilityPeriodUseCase,
    CreateDisabilityRetirementPlanningGrantFirstAnalysisUseCase,
    CreateDisabilityRetirementPlanningGrantPeriodUseCase,
    CreateDisabilityRetirementPlanningGrantResultUseCase,
    DownloadDisabilityRetirementPlanningGrantCompleteAnalysisUseCase,
    DownloadDisabilityRetirementPlanningGrantSimplifiedAnalysisUseCase,
    CreateDisabilityRetirementPlanningGrantUseCase,
    DeleteDisabilityRetirementPlanningGrantDisabilityPeriodUseCase,
    DeleteDisabilityRetirementPlanningGrantPeriodUseCase,
    DeleteDisabilityRetirementPlanningGrantTimeAcceleratorUseCase,
    GetDisabilityRetirementPlanningGrantUseCase,
    UpdateDisabilityRetirementPlanningGrantDisabilityPeriodUseCase,
    UpdateDisabilityRetirementPlanningGrantPeriodUseCase,
    UpdateDisabilityRetirementPlanningGrantTimeAcceleratorUseCase,
    UpdateDisabilityRetirementPlanningGrantUseCase,
  ],
})
export class DisabilityRetirementPlanningGrantModule {
  protected readonly _type = DisabilityRetirementPlanningGrantModule.name;
}
