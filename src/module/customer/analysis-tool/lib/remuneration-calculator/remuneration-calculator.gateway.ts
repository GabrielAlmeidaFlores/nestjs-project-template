import type { RemunerationDataInputModel } from '@module/customer/analysis-tool/lib/remuneration-calculator/model/input/remuneration-data.input.model';
import type { RemunerationCalculationOutputModel } from '@module/customer/analysis-tool/lib/remuneration-calculator/model/output/remuneration-calculation.output.model';
import type { RemunerationDetailOutputModel } from '@module/customer/analysis-tool/lib/remuneration-calculator/model/output/remuneration-detail.output.model';

export abstract class RemunerationCalculatorGateway {
  public abstract calculate(
    remunerations: RemunerationDataInputModel[],
  ): RemunerationCalculationOutputModel;

  public abstract calculateRemuneration(
    remuneration: RemunerationDataInputModel,
  ): RemunerationDetailOutputModel;
}
