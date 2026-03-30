import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { DisabilityRetirementPlanningGrantCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/enum/disability-retirement-planning-grant-category.enum';

export interface DisabilityRetirementPlanningGrantFirstAnalysisSourcePeriodInterface {
  startDate: Date;
  endDate: Date | null;
  category: DisabilityRetirementPlanningGrantCategoryEnum;
  contributionAverage: DecimalValue | null;
  bondOrigin: string | null;
}
