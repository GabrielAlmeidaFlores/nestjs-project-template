import { Module } from '@nestjs/common';

import { TeacherRetirementPlanningTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning/teacher-retirement-planning.typeorm.command.repository';
import { TeacherRetirementPlanningTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning/teacher-retirement-planning.typeorm.query.repository';
import { TeacherRetirementPlanningDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning-document/teacher-retirement-planning-document.typeorm.command.repository';
import { TeacherRetirementPlanningInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning-inss-benefit/teacher-retirement-planning-inss-benefit.typeorm.command.repository';
import { TeacherRetirementPlanningLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning-legal-proceeding/teacher-retirement-planning-legal-proceeding.typeorm.command.repository';
import { TeacherRetirementPlanningPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning-period/teacher-retirement-planning-period.typeorm.command.repository';
import { TeacherRetirementPlanningPeriodItemTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning-period-item/teacher-retirement-planning-period-item.typeorm.command.repository';
import { TeacherRetirementPlanningPeriodItemDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning-period-item-document/teacher-retirement-planning-period-item-document.typeorm.command.repository';
import { TeacherRetirementPlanningRemunerationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning-remuneration/teacher-retirement-planning-remuneration.typeorm.command.repository';
import { TeacherRetirementPlanningRemunerationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning-remuneration/teacher-retirement-planning-remuneration.typeorm.query.repository';
import { TeacherRetirementPlanningResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning-result/teacher-retirement-planning-result.typeorm.command.repository';
import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { RemunerationCalculatorModule } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.module';
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
    {
      provide: TeacherRetirementPlanningRppsCommandRepositoryGateway,
      useClass: TeacherRetirementPlanningTypeormCommandRepository,
    },
    {
      provide: TeacherRetirementPlanningRppsQueryRepositoryGateway,
      useClass: TeacherRetirementPlanningTypeormQueryRepository,
    },
    {
      provide: TeacherRetirementPlanningRppsDocumentCommandRepositoryGateway,
      useClass: TeacherRetirementPlanningDocumentTypeormCommandRepository,
    },
    {
      provide: TeacherRetirementPlanningRppsInssBenefitCommandRepositoryGateway,
      useClass: TeacherRetirementPlanningInssBenefitTypeormCommandRepository,
    },
    {
      provide: TeacherRetirementPlanningRppsLegalProceedingCommandRepositoryGateway,
      useClass: TeacherRetirementPlanningLegalProceedingTypeormCommandRepository,
    },
    {
      provide: TeacherRetirementPlanningRppsPeriodCommandRepositoryGateway,
      useClass: TeacherRetirementPlanningPeriodTypeormCommandRepository,
    },
    {
      provide: TeacherRetirementPlanningRppsPeriodItemCommandRepositoryGateway,
      useClass: TeacherRetirementPlanningPeriodItemTypeormCommandRepository,
    },
    {
      provide: TeacherRetirementPlanningRppsPeriodItemDocumentCommandRepositoryGateway,
      useClass: TeacherRetirementPlanningPeriodItemDocumentTypeormCommandRepository,
    },
    {
      provide: TeacherRetirementPlanningRppsRemunerationCommandRepositoryGateway,
      useClass: TeacherRetirementPlanningRemunerationTypeormCommandRepository,
    },
    {
      provide: TeacherRetirementPlanningRppsRemunerationQueryRepositoryGateway,
      useClass: TeacherRetirementPlanningRemunerationTypeormQueryRepository,
    },
    {
      provide: TeacherRetirementPlanningRppsResultCommandRepositoryGateway,
      useClass: TeacherRetirementPlanningResultTypeormCommandRepository,
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
