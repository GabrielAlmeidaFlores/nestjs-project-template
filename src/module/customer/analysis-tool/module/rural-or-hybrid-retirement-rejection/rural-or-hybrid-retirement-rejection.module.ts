import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { RuralOrHybridRetirementRejectionController } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/rural-or-hybrid-retirement-rejection.controller';
import { AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/analyze-rural-or-hybrid-retirement-rejection-time-accelerator.use-case';
import { CreateRuralOrHybridRetirementRejectionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/create-rural-or-hybrid-retirement-rejection-first-analysis.use-case';
import { CreateRuralOrHybridRetirementRejectionPeriodMemberUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/create-rural-or-hybrid-retirement-rejection-period-member.use-case';
import { CreateRuralOrHybridRetirementRejectionPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/create-rural-or-hybrid-retirement-rejection-period.use-case';
import { CreateRuralOrHybridRetirementRejectionResultUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/create-rural-or-hybrid-retirement-rejection-result.use-case';
import { CreateRuralOrHybridRetirementRejectionTestimonialWitnessUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/create-rural-or-hybrid-retirement-rejection-testimonial-witness.use-case';
import { CreateRuralOrHybridRetirementRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/create-rural-or-hybrid-retirement-rejection-time-accelerator.use-case';
import { CreateRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/create-rural-or-hybrid-retirement-rejection-work-period-document-analysis.use-case';
import { CreateRuralOrHybridRetirementRejectionWorkPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/create-rural-or-hybrid-retirement-rejection-work-period.use-case';
import { CreateRuralOrHybridRetirementRejectionUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/create-rural-or-hybrid-retirement-rejection.use-case';
import { DeleteRuralOrHybridRetirementRejectionPeriodMemberUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/delete-rural-or-hybrid-retirement-rejection-period-member.use-case';
import { DeleteRuralOrHybridRetirementRejectionPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/delete-rural-or-hybrid-retirement-rejection-period.use-case';
import { DeleteRuralOrHybridRetirementRejectionTestimonialWitnessUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/delete-rural-or-hybrid-retirement-rejection-testimonial-witness.use-case';
import { DeleteRuralOrHybridRetirementRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/delete-rural-or-hybrid-retirement-rejection-time-accelerator.use-case';
import { DeleteRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/delete-rural-or-hybrid-retirement-rejection-work-period-document-analysis.use-case';
import { DeleteRuralOrHybridRetirementRejectionWorkPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/delete-rural-or-hybrid-retirement-rejection-work-period.use-case';
import { DownloadRuralOrHybridRetirementRejectionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/download-rural-or-hybrid-retirement-rejection-complete-analysis.use-case';
import { DownloadRuralOrHybridRetirementRejectionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/download-rural-or-hybrid-retirement-rejection-simplified-analysis.use-case';
import { GetRuralOrHybridRetirementRejectionUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/get-rural-or-hybrid-retirement-rejection.use-case';
import { UpdateRuralOrHybridRetirementRejectionPeriodMemberUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/update-rural-or-hybrid-retirement-rejection-period-member.use-case';
import { UpdateRuralOrHybridRetirementRejectionPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/update-rural-or-hybrid-retirement-rejection-period.use-case';
import { UpdateRuralOrHybridRetirementRejectionTestimonialWitnessUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/update-rural-or-hybrid-retirement-rejection-testimonial-witness.use-case';
import { UpdateRuralOrHybridRetirementRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/update-rural-or-hybrid-retirement-rejection-time-accelerator.use-case';
import { UpdateRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/update-rural-or-hybrid-retirement-rejection-work-period-document-analysis.use-case';
import { UpdateRuralOrHybridRetirementRejectionWorkPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/update-rural-or-hybrid-retirement-rejection-work-period.use-case';
import { UpdateRuralOrHybridRetirementRejectionUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/update-rural-or-hybrid-retirement-rejection.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    OrganizationSessionModule,
    DatabaseModule,
    CnisAnalyzerModule,
    AnalysisProcessorModule,
    FileProcessorModule,
    ExportDocumentModule,
    OrganizationCreditModule,
    PaymentPlanModule,
  ],
  controllers: [RuralOrHybridRetirementRejectionController],
  providers: [
    CreateRuralOrHybridRetirementRejectionUseCase,
    UpdateRuralOrHybridRetirementRejectionUseCase,
    GetRuralOrHybridRetirementRejectionUseCase,
    CreateRuralOrHybridRetirementRejectionFirstAnalysisUseCase,
    CreateRuralOrHybridRetirementRejectionResultUseCase,
    CreateRuralOrHybridRetirementRejectionPeriodUseCase,
    UpdateRuralOrHybridRetirementRejectionPeriodUseCase,
    DeleteRuralOrHybridRetirementRejectionPeriodUseCase,
    CreateRuralOrHybridRetirementRejectionPeriodMemberUseCase,
    UpdateRuralOrHybridRetirementRejectionPeriodMemberUseCase,
    DeleteRuralOrHybridRetirementRejectionPeriodMemberUseCase,
    CreateRuralOrHybridRetirementRejectionTestimonialWitnessUseCase,
    UpdateRuralOrHybridRetirementRejectionTestimonialWitnessUseCase,
    DeleteRuralOrHybridRetirementRejectionTestimonialWitnessUseCase,
    CreateRuralOrHybridRetirementRejectionWorkPeriodUseCase,
    UpdateRuralOrHybridRetirementRejectionWorkPeriodUseCase,
    DeleteRuralOrHybridRetirementRejectionWorkPeriodUseCase,
    CreateRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisUseCase,
    UpdateRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisUseCase,
    DeleteRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisUseCase,
    CreateRuralOrHybridRetirementRejectionTimeAcceleratorUseCase,
    UpdateRuralOrHybridRetirementRejectionTimeAcceleratorUseCase,
    DeleteRuralOrHybridRetirementRejectionTimeAcceleratorUseCase,
    AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorUseCase,
    DownloadRuralOrHybridRetirementRejectionCompleteAnalysisUseCase,
    DownloadRuralOrHybridRetirementRejectionSimplifiedAnalysisUseCase,
  ],
})
export class RuralOrHybridRetirementRejectionModule {
  protected readonly _type = RuralOrHybridRetirementRejectionModule.name;
}
