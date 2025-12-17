import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisToolModule } from '@module/customer/analysis-tool/analysis-tool.module';
import { LegalProceedingController } from '@module/customer/legal-proceeding/legal-proceeding.controller';
import { LegalProceedingConsumerModule } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/legal-proceeding-consumer.module';
import { CountLegalProceedingDetailUseCase } from '@module/customer/legal-proceeding/use-case/count-legal-proceeding-detail.use-case';
import { GetLegalProceedingDetailByLegalProceedingNumberUseCase } from '@module/customer/legal-proceeding/use-case/get-legal-proceeding-detail-by-legal-proceeding-number.use-case';
import { LegalProceedingCronUseCase } from '@module/customer/legal-proceeding/use-case/legal-proceeding-cron.use-case';
import { ListLegalProceedingDetailByAnalysisToolClientIdUseCase } from '@module/customer/legal-proceeding/use-case/list-legal-proceeding-detail-by-analysis-tool-client-id.use-case';
import { ListLegalProceedingDetailUseCase } from '@module/customer/legal-proceeding/use-case/list-legal-proceeding-detail.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    LegalProceedingConsumerModule,
    AnalysisToolModule,
    OrganizationSessionModule,
  ],
  controllers: [LegalProceedingController],
  providers: [
    LegalProceedingCronUseCase,
    ListLegalProceedingDetailUseCase,
    GetLegalProceedingDetailByLegalProceedingNumberUseCase,
    CountLegalProceedingDetailUseCase,
    ListLegalProceedingDetailByAnalysisToolClientIdUseCase,
  ],
})
export class LegalProceedingModule {
  protected readonly _type = LegalProceedingModule.name;
}
