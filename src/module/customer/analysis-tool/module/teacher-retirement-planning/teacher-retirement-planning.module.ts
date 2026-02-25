import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { RemunerationCalculatorModule } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.module';
import { TeacherRetirementPlanningController } from '@module/customer/analysis-tool/module/teacher-retirement-planning/teacher-retirement-planning.controller';
import { CreateTeacherRetirementPlanningPeriodUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/create-teacher-retirement-planning-period.use-case';
import { CreateTeacherRetirementPlanningRemunerationUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/create-teacher-retirement-planning-remuneration.use-case';
import { CreateTeacherRetirementPlanningResultUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/create-teacher-retirement-planning-result.use-case';
import { CreateTeacherRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/create-teacher-retirement-planning.use-case';
import { DeleteTeacherRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/delete-teacher-retirement-planning.use-case';
import { DownloadTeacherRetirementPlanningCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/download-teacher-retirement-planning-complete-analysis.use-case';
import { DownloadTeacherRetirementPlanningSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/download-teacher-retirement-planning-simplified-analysis.use-case';
import { GetTeacherRetirementPlanningRemunerationCalculationUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/get-teacher-retirement-planning-remuneration-calculation.use-case';
import { GetTeacherRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/get-teacher-retirement-planning.use-case';
import { ListTeacherRetirementPlanningRemunerationUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/list-teacher-retirement-planning-remuneration.use-case';
import { UpdateTeacherRetirementPlanningPeriodUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/update-teacher-retirement-planning-period.use-case';
import { UpdateTeacherRetirementPlanningRemunerationUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/update-teacher-retirement-planning-remuneration.use-case';
import { UpdateTeacherRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/update-teacher-retirement-planning.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    OrganizationSessionModule,
    DatabaseModule,
    AnalysisProcessorModule,
    FileProcessorModule,
    ExportDocumentModule,
    RemunerationCalculatorModule,
    OrganizationCreditModule,
    PaymentPlanModule,
  ],
  controllers: [TeacherRetirementPlanningController],
  providers: [
    CreateTeacherRetirementPlanningUseCase,
    UpdateTeacherRetirementPlanningUseCase,
    GetTeacherRetirementPlanningUseCase,
    DeleteTeacherRetirementPlanningUseCase,
    CreateTeacherRetirementPlanningResultUseCase,
    DownloadTeacherRetirementPlanningCompleteAnalysisUseCase,
    DownloadTeacherRetirementPlanningSimplifiedAnalysisUseCase,
    CreateTeacherRetirementPlanningPeriodUseCase,
    CreateTeacherRetirementPlanningRemunerationUseCase,
    UpdateTeacherRetirementPlanningPeriodUseCase,
    UpdateTeacherRetirementPlanningRemunerationUseCase,
    ListTeacherRetirementPlanningRemunerationUseCase,
    GetTeacherRetirementPlanningRemunerationCalculationUseCase,
  ],
  exports: [DeleteTeacherRetirementPlanningUseCase],
})
export class TeacherRetirementPlanningModule {
  protected readonly _type = TeacherRetirementPlanningModule.name;
}
