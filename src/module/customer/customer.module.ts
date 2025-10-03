import { Module } from '@nestjs/common';

import { AccountModule } from '@module/customer/account/account.module';
import { AnalysisToolsModule } from '@module/customer/analysis-tools/analysis-tools.module';
import { TranscriptionModule } from '@module/customer/transcription/transcription.module';

@Module({
  imports: [AccountModule, AnalysisToolsModule, TranscriptionModule],
  controllers: [],
  providers: [],
})
export class CustomerModule {
  protected readonly _type = CustomerModule.name;
}
