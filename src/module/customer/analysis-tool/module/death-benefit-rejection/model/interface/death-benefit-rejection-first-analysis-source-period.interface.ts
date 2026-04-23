import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { DeathBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-category.enum';
import type { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';

export interface DeathBenefitRejectionFirstAnalysisSourcePeriodInterface {
  id: DeathBenefitRejectionPeriodId;
  startDate: Date;
  endDate: Date | null;
  category: DeathBenefitRejectionCategoryEnum;
  contributionAverage: DecimalValue | null;
  bondOrigin: string | null;
}
