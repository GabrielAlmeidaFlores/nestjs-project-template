import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { CnisAnalyzerModule } from '@lib/cnis-analyzer/cnis-analyzer.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { TeacherRetirementPlanningRejectionController } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/teacher-retirement-planning-rejection.controller';
import { AnalyzeTeacherRetirementPlanningRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/analyze-teacher-retirement-planning-rejection-time-accelerator.use-case';
import { AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/analyze-teacher-retirement-planning-rejection-work-period-documents.use-case';
import { CreateTeacherRetirementPlanningRejectionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/create-teacher-retirement-planning-rejection-first-analysis.use-case';
import { CreateTeacherRetirementPlanningRejectionInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/create-teacher-retirement-planning-rejection-inss-decision-analysis.use-case';
import { CreateTeacherRetirementPlanningRejectionResultUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/create-teacher-retirement-planning-rejection-result.use-case';
import { CreateTeacherRetirementPlanningRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/create-teacher-retirement-planning-rejection-time-accelerator.use-case';
import { CreateTeacherRetirementPlanningRejectionWorkPeriodUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/create-teacher-retirement-planning-rejection-work-period.use-case';
import { CreateTeacherRetirementPlanningRejectionUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/create-teacher-retirement-planning-rejection.use-case';
import { DeleteTeacherRetirementPlanningRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/delete-teacher-retirement-planning-rejection-time-accelerator.use-case';
import { DeleteTeacherRetirementPlanningRejectionWorkPeriodUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/delete-teacher-retirement-planning-rejection-work-period.use-case';
import { DownloadTeacherRetirementPlanningRejectionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/download-teacher-retirement-planning-rejection-complete-analysis.use-case';
import { DownloadTeacherRetirementPlanningRejectionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/download-teacher-retirement-planning-rejection-simplified-analysis.use-case';
import { GetTeacherRetirementPlanningRejectionUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/get-teacher-retirement-planning-rejection.use-case';
import { SaveTeacherRetirementPlanningRejectionTeachingPeriodsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/save-teacher-retirement-planning-rejection-teaching-periods.use-case';
import { UpdateTeacherRetirementPlanningRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/update-teacher-retirement-planning-rejection-time-accelerator.use-case';
import { UpdateTeacherRetirementPlanningRejectionWorkPeriodUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/update-teacher-retirement-planning-rejection-work-period.use-case';
import { UpdateTeacherRetirementPlanningRejectionUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/update-teacher-retirement-planning-rejection.use-case';
import { UploadTeacherRetirementPlanningRejectionDocumentsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/upload-teacher-retirement-planning-rejection-documents.use-case';
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
  controllers: [TeacherRetirementPlanningRejectionController],
  providers: [
    CreateTeacherRetirementPlanningRejectionUseCase,
    UpdateTeacherRetirementPlanningRejectionUseCase,
    GetTeacherRetirementPlanningRejectionUseCase,
    SaveTeacherRetirementPlanningRejectionTeachingPeriodsUseCase,
    UploadTeacherRetirementPlanningRejectionDocumentsUseCase,
    CreateTeacherRetirementPlanningRejectionInssDecisionAnalysisUseCase,
    CreateTeacherRetirementPlanningRejectionFirstAnalysisUseCase,
    CreateTeacherRetirementPlanningRejectionWorkPeriodUseCase,
    UpdateTeacherRetirementPlanningRejectionWorkPeriodUseCase,
    DeleteTeacherRetirementPlanningRejectionWorkPeriodUseCase,
    AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentsUseCase,
    CreateTeacherRetirementPlanningRejectionTimeAcceleratorUseCase,
    UpdateTeacherRetirementPlanningRejectionTimeAcceleratorUseCase,
    DeleteTeacherRetirementPlanningRejectionTimeAcceleratorUseCase,
    AnalyzeTeacherRetirementPlanningRejectionTimeAcceleratorUseCase,
    CreateTeacherRetirementPlanningRejectionResultUseCase,
    DownloadTeacherRetirementPlanningRejectionCompleteAnalysisUseCase,
    DownloadTeacherRetirementPlanningRejectionSimplifiedAnalysisUseCase,
  ],
})
export class TeacherRetirementPlanningRejectionModule {
  protected readonly _type = TeacherRetirementPlanningRejectionModule.name;
}
