import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { EmailModule } from '@infra/email/email.module';
import { PaymentPlanModule } from '@module/admin/payment-plan/payment-plan.module';
import { AnalysisToolModule } from '@module/customer/analysis-tool/analysis-tool.module';
import { SearchForLegalProceedingUpdateCron } from '@module/customer/legal-proceeding/cron/search-for-legal-proceeding-update.cron';
import { LegalProceedingController } from '@module/customer/legal-proceeding/legal-proceeding.controller';
import { LegalProceedingConsumerModule } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/legal-proceeding-consumer.module';
import { CountLegalProceedingDetailUseCase } from '@module/customer/legal-proceeding/use-case/count-legal-proceeding-detail.use-case';
import { GetLegalProceedingDetailByLegalProceedingNumberUseCase } from '@module/customer/legal-proceeding/use-case/get-legal-proceeding-detail-by-legal-proceeding-number.use-case';
import { ListAnalysisToolClientLegalProceedingActionUseCase } from '@module/customer/legal-proceeding/use-case/list-analysis-tool-client-legal-proceeding-actions.use-case';
import { UpdateLegalProceedingDataUseCase } from '@module/customer/legal-proceeding/use-case/update-legal-proceeding-data.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    LegalProceedingConsumerModule,
    AnalysisToolModule,
    OrganizationSessionModule,
    PaymentPlanModule,
    OrganizationCreditModule,
    EmailModule,
  ],
  controllers: [LegalProceedingController],
  providers: [
    SearchForLegalProceedingUpdateCron,
    GetLegalProceedingDetailByLegalProceedingNumberUseCase,
    CountLegalProceedingDetailUseCase,
    ListAnalysisToolClientLegalProceedingActionUseCase,
    UpdateLegalProceedingDataUseCase,
  ],
})
export class LegalProceedingModule {
  protected readonly _type = LegalProceedingModule.name;
}
