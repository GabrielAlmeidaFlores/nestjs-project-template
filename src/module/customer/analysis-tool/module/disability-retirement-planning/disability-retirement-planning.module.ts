import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { DisabilityRetirementPlanningController } from '@module/customer/analysis-tool/module/disability-retirement-planning/disability-retirement-planning.controller';
import { CreateDisabilityRetirementPlanningRemunerationUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/create-disability-retirement-planning-remuneration.use-case';
import { CreateDisabilityRetirementPlanningPeriodUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/create-disability-retirement-planning-period.use-case';
import { CreateDisabilityRetirementPlanningResultUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/create-disability-retirement-planning-result.use-case';
import { CreateDisabilityRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/create-disability-retirement-planning.use-case';
import { DeleteDisabilityRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/delete-disability-retirement-planning.use-case';
import { GetDisabilityRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/get-disability-retirement-planning.use-case';
import { ListDisabilityRetirementPlanningRemunerationUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/list-disability-retirement-planning-remuneration.use-case';
import { UpdateDisabilityRetirementPlanningRemunerationUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/update-disability-retirement-planning-remuneration.use-case';
import { UpdateDisabilityRetirementPlanningPeriodUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/update-disability-retirement-planning-period.use-case';
import { UpdateDisabilityRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/update-disability-retirement-planning.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    AnalysisProcessorModule,
    FileProcessorModule,
    OrganizationCreditModule,
    OrganizationSessionModule,
    PaymentPlanModule,
  ],
  controllers: [DisabilityRetirementPlanningController],
  providers: [
    CreateDisabilityRetirementPlanningUseCase,
    CreateDisabilityRetirementPlanningPeriodUseCase,
    UpdateDisabilityRetirementPlanningPeriodUseCase,
    CreateDisabilityRetirementPlanningRemunerationUseCase,
    UpdateDisabilityRetirementPlanningRemunerationUseCase,
    GetDisabilityRetirementPlanningUseCase,
    ListDisabilityRetirementPlanningRemunerationUseCase,
    UpdateDisabilityRetirementPlanningUseCase,
    CreateDisabilityRetirementPlanningResultUseCase,
    DeleteDisabilityRetirementPlanningUseCase,
  ],
  exports: [DeleteDisabilityRetirementPlanningUseCase],
})
export class DisabilityRetirementPlanningModule {
  protected readonly _type = DisabilityRetirementPlanningModule.name;
}
