import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { MiniAdvisorController } from '@module/customer/analysis-tool/module/mini-advisor/mini-advisor.controller';
import { CreateMiniAdvisorResultUseCase } from '@module/customer/analysis-tool/module/mini-advisor/use-case/create-mini-advisor-result.use-case';
import { CreateMiniAdvisorUseCase } from '@module/customer/analysis-tool/module/mini-advisor/use-case/create-mini-advisor.use-case';
import { GetMiniAdvisorUseCase } from '@module/customer/analysis-tool/module/mini-advisor/use-case/get-mini-advisor.use-case';
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
    AnalysisProcessorModule,
  ],
  controllers: [MiniAdvisorController],
  providers: [
    CreateMiniAdvisorUseCase,
    CreateMiniAdvisorResultUseCase,
    GetMiniAdvisorUseCase,
  ],
})
export class MiniAdvisorModule {
  protected readonly _type = MiniAdvisorModule.name;
}
