import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { DatabaseModule } from '@infra/database/database.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { DeathBenefitRejectionController } from '@module/customer/analysis-tool/module/death-benefit-rejection/death-benefit-rejection.controller';
import { AnalyzeDeathBenefitRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/analyze-death-benefit-rejection-time-accelerator.use-case';
import { CreateDeathBenefitRejectionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/create-death-benefit-rejection-first-analysis.use-case';
import { CreateDeathBenefitRejectionInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/create-death-benefit-rejection-inss-decision-analysis.use-case';
import { CreateDeathBenefitRejectionPeriodUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/create-death-benefit-rejection-period.use-case';
import { CreateDeathBenefitRejectionResultUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/create-death-benefit-rejection-result.use-case';
import { CreateDeathBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/create-death-benefit-rejection.use-case';
import { DeleteDeathBenefitRejectionPeriodUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/delete-death-benefit-rejection-period.use-case';
import { DeleteDeathBenefitRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/delete-death-benefit-rejection-time-accelerator.use-case';
import { DownloadDeathBenefitRejectionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/download-death-benefit-rejection-complete-analysis.use-case';
import { DownloadDeathBenefitRejectionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/download-death-benefit-rejection-simplified-analysis.use-case';
import { GetDeathBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/get-death-benefit-rejection.use-case';
import { UpdateDeathBenefitRejectionDependentUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/update-death-benefit-rejection-dependent.use-case';
import { UpdateDeathBenefitRejectionInstitutorDataUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/update-death-benefit-rejection-institutor-data.use-case';
import { UpdateDeathBenefitRejectionLegalRepresentativeUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/update-death-benefit-rejection-legal-representative.use-case';
import { UpdateDeathBenefitRejectionPeriodUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/update-death-benefit-rejection-period.use-case';
import { UpdateDeathBenefitRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/update-death-benefit-rejection-time-accelerator.use-case';
import { UpdateDeathBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/update-death-benefit-rejection.use-case';
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
  controllers: [DeathBenefitRejectionController],
  providers: [
    CreateDeathBenefitRejectionUseCase,
    GetDeathBenefitRejectionUseCase,
    UpdateDeathBenefitRejectionUseCase,
    UpdateDeathBenefitRejectionInstitutorDataUseCase,
    CreateDeathBenefitRejectionPeriodUseCase,
    UpdateDeathBenefitRejectionPeriodUseCase,
    DeleteDeathBenefitRejectionPeriodUseCase,
    UpdateDeathBenefitRejectionLegalRepresentativeUseCase,
    UpdateDeathBenefitRejectionDependentUseCase,
    CreateDeathBenefitRejectionFirstAnalysisUseCase,
    CreateDeathBenefitRejectionInssDecisionAnalysisUseCase,
    CreateDeathBenefitRejectionResultUseCase,
    AnalyzeDeathBenefitRejectionTimeAcceleratorUseCase,
    UpdateDeathBenefitRejectionTimeAcceleratorUseCase,
    DeleteDeathBenefitRejectionTimeAcceleratorUseCase,
    DownloadDeathBenefitRejectionCompleteAnalysisUseCase,
    DownloadDeathBenefitRejectionSimplifiedAnalysisUseCase,
  ],
})
export class DeathBenefitRejectionModule {
  protected readonly _type = DeathBenefitRejectionModule.name;
}
