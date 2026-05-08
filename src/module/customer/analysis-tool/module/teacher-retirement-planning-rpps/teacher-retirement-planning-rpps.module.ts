import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { RemunerationCalculatorModule } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.module';
import { TeacherRetirementPlanningRppsController } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/teacher-retirement-planning-rpps.controller';
import { AnalyzeTeacherRetirementPlanningAdministrativeProcessRppsUseCase } from './use-case/analyze-teacher-retirement-planning-administrative-process-rpps.use-case';
import { CreateTeacherRetirementPlanningPeriodRppsUseCase } from './use-case/create-teacher-retirement-planning-period-rpps.use-case';
import { CreateTeacherRetirementPlanningRemunerationRppsUseCase } from './use-case/create-teacher-retirement-planning-remuneration-rpps.use-case';
import { CreateTeacherRetirementPlanningResultRppsUseCase } from './use-case/create-teacher-retirement-planning-result-rpps.use-case';
import { CreateTeacherRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/use-case/create-teacher-retirement-planning-rpps.use-case';
import { DeleteTeacherRetirementPlanningRppsUseCase } from './use-case/delete-teacher-retirement-planning-rpps.use-case';
import { DownloadTeacherRetirementPlanningCompleteAnalysisRppsUseCase } from './use-case/download-teacher-retirement-planning-complete-analysis-rpps.use-case';
import { DownloadTeacherRetirementPlanningSimplifiedAnalysisRppsUseCase } from './use-case/download-teacher-retirement-planning-simplified-analysis-rpps.use-case';
import { GetTeacherRetirementPlanningRemunerationCalculationRppsUseCase } from './use-case/get-teacher-retirement-planning-remuneration-calculation-rpps.use-case';
import { GetTeacherRetirementPlanningRppsUseCase } from './use-case/get-teacher-retirement-planning-rpps.use-case';
import { ListTeacherRetirementPlanningRemunerationRppsUseCase } from './use-case/list-teacher-retirement-planning-remuneration-rpps.use-case';
import { UpdateTeacherRetirementPlanningPeriodRppsUseCase } from './use-case/update-teacher-retirement-planning-period-rpps.use-case';
import { UpdateTeacherRetirementPlanningRemunerationRppsUseCase } from './use-case/update-teacher-retirement-planning-remuneration-rpps.use-case';
import { UpdateTeacherRetirementPlanningRppsUseCase } from './use-case/update-teacher-retirement-planning-rpps.use-case';
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
  controllers: [TeacherRetirementPlanningRppsController],
  providers: [
    CreateTeacherRetirementPlanningRppsUseCase,
    UpdateTeacherRetirementPlanningRppsUseCase,
    GetTeacherRetirementPlanningRppsUseCase,
    DeleteTeacherRetirementPlanningRppsUseCase,
    CreateTeacherRetirementPlanningResultRppsUseCase,
    DownloadTeacherRetirementPlanningCompleteAnalysisRppsUseCase,
    DownloadTeacherRetirementPlanningSimplifiedAnalysisRppsUseCase,
    CreateTeacherRetirementPlanningPeriodRppsUseCase,
    CreateTeacherRetirementPlanningRemunerationRppsUseCase,
    UpdateTeacherRetirementPlanningPeriodRppsUseCase,
    UpdateTeacherRetirementPlanningRemunerationRppsUseCase,
    ListTeacherRetirementPlanningRemunerationRppsUseCase,
    GetTeacherRetirementPlanningRemunerationCalculationRppsUseCase,
    AnalyzeTeacherRetirementPlanningAdministrativeProcessRppsUseCase,
  ],
  exports: [DeleteTeacherRetirementPlanningRppsUseCase],
})
export class TeacherRetirementPlanningRppsModule {
  protected readonly _type = TeacherRetirementPlanningRppsModule.name;
}
