import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { AudienceQuestionGeneratorController } from '@module/customer/analysis-tool/module/audience-question-generator/audience-question-generator.controller';
import { CreateAudienceQuestionGeneratorResultUseCase } from '@module/customer/analysis-tool/module/audience-question-generator/use-case/create-audience-question-generator-result.use-case';
import { CreateAudienceQuestionGeneratorUseCase } from '@module/customer/analysis-tool/module/audience-question-generator/use-case/create-audience-question-generator.use-case';
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
    FileProcessorModule,
    AnalysisProcessorModule,
  ],
  controllers: [AudienceQuestionGeneratorController],
  providers: [
    CreateAudienceQuestionGeneratorUseCase,
    CreateAudienceQuestionGeneratorResultUseCase,
  ],
  exports: [],
})
export class AudienceQuestionGeneratorModule {
  protected readonly _type = AudienceQuestionGeneratorModule.name;
}
