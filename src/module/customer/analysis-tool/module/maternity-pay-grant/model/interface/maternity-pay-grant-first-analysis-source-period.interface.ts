import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';
import type { MaternityPayGrantCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/enum/maternity-pay-grant-category.enum';

export interface MaternityPayGrantFirstAnalysisSourcePeriodInterface {
  id: MaternityPayGrantPeriodId;
  startDate: Date;
  endDate: Date | null;
  category: MaternityPayGrantCategoryEnum;
  contributionAverage: DecimalValue | null;
  bondOrigin: string | null;
}
