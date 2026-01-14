import { Module } from '@nestjs/common';

import { RemunerationCalculatorGateway } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.gateway';
import { RemunerationCalculatorService } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.service';

@Module({
  providers: [
    {
      provide: RemunerationCalculatorGateway,
      useClass: RemunerationCalculatorService,
    },
  ],
  exports: [RemunerationCalculatorGateway],
})
export class RemunerationCalculatorModule {
  protected readonly _type = RemunerationCalculatorModule.name;
}
