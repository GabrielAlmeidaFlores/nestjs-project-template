import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { RemunerationCalculatorModule } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.module';
import { TeacherRetirementPlanningCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/command/teacher-retirement-planning.command.repository.gateway';
import { TeacherRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/query/teacher-retirement-planning.query.repository.gateway';
import { TeacherRetirementPlanningDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-document/command/teacher-retirement-planning-document.command.repository.gateway';
import { TeacherRetirementPlanningInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-inss-benefit/command/teacher-retirement-planning-inss-benefit.command.repository.gateway';
import { TeacherRetirementPlanningLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-legal-proceeding/command/teacher-retirement-planning-legal-proceeding.command.repository.gateway';
import { TeacherRetirementPlanningPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period/command/teacher-retirement-planning-period.command.repository.gateway';
import { TeacherRetirementPlanningPeriodItemCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period-item/command/teacher-retirement-planning-period-item.command.repository.gateway';
import { TeacherRetirementPlanningPeriodItemDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period-item-document/command/teacher-retirement-planning-period-item-document.command.repository.gateway';
import { TeacherRetirementPlanningRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-remuneration/command/teacher-retirement-planning-remuneration.command.repository.gateway';
import { TeacherRetirementPlanningRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-remuneration/query/teacher-retirement-planning-remuneration.query.repository.gateway';
import { TeacherRetirementPlanningResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-result/command/teacher-retirement-planning-result.command.repository.gateway';
import { TeacherRetirementPlanningRppsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning/command/teacher-retirement-planning.command.repository.gateway';
import { TeacherRetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning/query/teacher-retirement-planning.query.repository.gateway';
import { TeacherRetirementPlanningRppsDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-document/command/teacher-retirement-planning-document.command.repository.gateway';
import { TeacherRetirementPlanningRppsInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-inss-benefit/command/teacher-retirement-planning-inss-benefit.command.repository.gateway';
import { TeacherRetirementPlanningRppsLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-legal-proceeding/command/teacher-retirement-planning-legal-proceeding.command.repository.gateway';
import { TeacherRetirementPlanningRppsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-period/command/teacher-retirement-planning-period.command.repository.gateway';
import { TeacherRetirementPlanningRppsPeriodItemCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-period-item/command/teacher-retirement-planning-period-item.command.repository.gateway';
import { TeacherRetirementPlanningRppsPeriodItemDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-period-item-document/command/teacher-retirement-planning-period-item-document.command.repository.gateway';
import { TeacherRetirementPlanningRppsRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-remuneration/command/teacher-retirement-planning-remuneration.command.repository.gateway';
import { TeacherRetirementPlanningRppsRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-remuneration/query/teacher-retirement-planning-remuneration.query.repository.gateway';
import { TeacherRetirementPlanningRppsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-result/command/teacher-retirement-planning-result.command.repository.gateway';
import { TeacherRetirementPlanningRppsController } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/teacher-retirement-planning-rpps.controller';
import { AnalyzeTeacherRetirementPlanningAdministrativeProcessRppsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/use-case/analyze-teacher-retirement-planning-administrative-process-rpps.use-case';
import { CreateTeacherRetirementPlanningPeriodRppsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/use-case/create-teacher-retirement-planning-period-rpps.use-case';
import { CreateTeacherRetirementPlanningRemunerationRppsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/use-case/create-teacher-retirement-planning-remuneration-rpps.use-case';
import { CreateTeacherRetirementPlanningResultRppsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/use-case/create-teacher-retirement-planning-result-rpps.use-case';
import { CreateTeacherRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/use-case/create-teacher-retirement-planning-rpps.use-case';
import { DeleteTeacherRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/use-case/delete-teacher-retirement-planning-rpps.use-case';
import { DownloadTeacherRetirementPlanningCompleteAnalysisRppsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/use-case/download-teacher-retirement-planning-complete-analysis-rpps.use-case';
import { DownloadTeacherRetirementPlanningSimplifiedAnalysisRppsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/use-case/download-teacher-retirement-planning-simplified-analysis-rpps.use-case';
import { GetTeacherRetirementPlanningRemunerationCalculationRppsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/use-case/get-teacher-retirement-planning-remuneration-calculation-rpps.use-case';
import { GetTeacherRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/use-case/get-teacher-retirement-planning-rpps.use-case';
import { ListTeacherRetirementPlanningRemunerationRppsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/use-case/list-teacher-retirement-planning-remuneration-rpps.use-case';
import { UpdateTeacherRetirementPlanningPeriodRppsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/use-case/update-teacher-retirement-planning-period-rpps.use-case';
import { UpdateTeacherRetirementPlanningRemunerationRppsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/use-case/update-teacher-retirement-planning-remuneration-rpps.use-case';
import { UpdateTeacherRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/use-case/update-teacher-retirement-planning-rpps.use-case';
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
    {
      provide: TeacherRetirementPlanningRppsCommandRepositoryGateway,
      useExisting: TeacherRetirementPlanningCommandRepositoryGateway,
    },
    {
      provide: TeacherRetirementPlanningRppsQueryRepositoryGateway,
      useExisting: TeacherRetirementPlanningQueryRepositoryGateway,
    },
    {
      provide: TeacherRetirementPlanningRppsDocumentCommandRepositoryGateway,
      useExisting: TeacherRetirementPlanningDocumentCommandRepositoryGateway,
    },
    {
      provide: TeacherRetirementPlanningRppsInssBenefitCommandRepositoryGateway,
      useExisting: TeacherRetirementPlanningInssBenefitCommandRepositoryGateway,
    },
    {
      provide:
        TeacherRetirementPlanningRppsLegalProceedingCommandRepositoryGateway,
      useExisting:
        TeacherRetirementPlanningLegalProceedingCommandRepositoryGateway,
    },
    {
      provide: TeacherRetirementPlanningRppsPeriodCommandRepositoryGateway,
      useExisting: TeacherRetirementPlanningPeriodCommandRepositoryGateway,
    },
    {
      provide: TeacherRetirementPlanningRppsPeriodItemCommandRepositoryGateway,
      useExisting: TeacherRetirementPlanningPeriodItemCommandRepositoryGateway,
    },
    {
      provide:
        TeacherRetirementPlanningRppsPeriodItemDocumentCommandRepositoryGateway,
      useExisting:
        TeacherRetirementPlanningPeriodItemDocumentCommandRepositoryGateway,
    },
    {
      provide:
        TeacherRetirementPlanningRppsRemunerationCommandRepositoryGateway,
      useExisting:
        TeacherRetirementPlanningRemunerationCommandRepositoryGateway,
    },
    {
      provide: TeacherRetirementPlanningRppsRemunerationQueryRepositoryGateway,
      useExisting: TeacherRetirementPlanningRemunerationQueryRepositoryGateway,
    },
    {
      provide: TeacherRetirementPlanningRppsResultCommandRepositoryGateway,
      useExisting: TeacherRetirementPlanningResultCommandRepositoryGateway,
    },
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
