import { Module } from '@nestjs/common';

import { AccountModule } from '@module/customer/account/account.module';
import { AnalysisToolModule } from '@module/customer/analysis-tool/analysis-tool.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { TranscriptionModule } from '@module/customer/transcription/transcription.module';

@Module({
  imports: [
    AccountModule,
    AnalysisToolModule,
    TranscriptionModule,
    PaymentPlanModule,
  ],
  controllers: [],
  providers: [],
})
export class CustomerModule {
  protected readonly _type = CustomerModule.name;
}
