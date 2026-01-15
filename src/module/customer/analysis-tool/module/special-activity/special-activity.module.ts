import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { AnalysisProcessorModule } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { SpecialActivityController } from '@module/customer/analysis-tool/module/special-activity/special-activity.controller';
import { CreateSpecialActivityResultUseCase } from '@module/customer/analysis-tool/module/special-activity/use-case/create-special-activity-result.use-case';
import { CreateSpecialActivityUseCase } from '@module/customer/analysis-tool/module/special-activity/use-case/create-special-activity.use-case';
import { GetSpecialActivityByIdUseCase } from '@module/customer/analysis-tool/module/special-activity/use-case/get-special-activity-by-id.use-case';
import { UpdateSpecialActivityUseCase } from '@module/customer/analysis-tool/module/special-activity/use-case/update-special-activity.use-case';
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
    GenerativeIaModule,
  ],
  controllers: [SpecialActivityController],
  providers: [
    CreateSpecialActivityUseCase,
    UpdateSpecialActivityUseCase,
    GetSpecialActivityByIdUseCase,
    CreateSpecialActivityResultUseCase,
  ],
  exports: [
    CreateSpecialActivityUseCase,
    UpdateSpecialActivityUseCase,
    GetSpecialActivityByIdUseCase,
    CreateSpecialActivityResultUseCase,
  ],
})
export class SpecialActivityModule {
  protected readonly _type = SpecialActivityModule.name;
}
