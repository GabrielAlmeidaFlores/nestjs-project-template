import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { PeriodDocumentAnalysisController } from '@module/generic/period-document-analysis/period-document-analysis.controller';
import { AnalyzePeriodDocumentUseCase } from '@module/generic/period-document-analysis/use-case/analyze-period-document.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    GenerativeIaModule,
    OrganizationSessionModule,
    OrganizationCreditModule,
    PaymentPlanModule,
  ],
  controllers: [PeriodDocumentAnalysisController],
  providers: [AnalyzePeriodDocumentUseCase],
})
export class PeriodDocumentAnalysisModule {
  protected readonly _type = PeriodDocumentAnalysisModule.name;
}
