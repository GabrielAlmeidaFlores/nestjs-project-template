import { Module } from '@nestjs/common';

import { AccountModule } from '@module/customer/account/account.module';
import { CnisFastAnalysisModule } from '@module/customer/cnis-fast-analysis/cnis-fast-analysis.module';
import { TranscriptionModule } from '@module/customer/transcription/transcription.module';

@Module({
  imports: [AccountModule, CnisFastAnalysisModule, TranscriptionModule],
  controllers: [],
  providers: [],
})
export class CustomerModule {
  protected readonly _type = CustomerModule.name;
}
