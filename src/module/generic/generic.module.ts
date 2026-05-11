import { Module } from '@nestjs/common';

import { AuthIdentityModule } from '@module/generic/auth-identity/auth-identity.module';
import { BankModule } from '@module/generic/bank/bank.module';
import { PeriodDocumentAnalysisModule } from '@module/generic/period-document-analysis/period-document-analysis.module';

@Module({
  imports: [AuthIdentityModule, BankModule, PeriodDocumentAnalysisModule],
  controllers: [],
  providers: [],
})
export class GenericModule {
  protected readonly _type = GenericModule.name;
}
