import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { DeathBenefitGrantCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-category.enum';
import type { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';

export interface DeathBenefitGrantFirstAnalysisSourcePeriodInterface {
  id: DeathBenefitGrantPeriodId;
  startDate: Date;
  endDate: Date | null;
  category: DeathBenefitGrantCategoryEnum;
  contributionAverage: DecimalValue | null;
  bondOrigin: string | null;
}
