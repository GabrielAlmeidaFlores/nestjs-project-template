import { Module } from '@nestjs/common';

import { CidTenModule } from '@module/customer/analysis-tool/module/cid-ten/cid-ten.module';

@Module({
  imports: [CidTenModule],
})
export class AnalysisToolModule {
  protected readonly _type = AnalysisToolModule.name;
}
