import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { MaternityPayGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/enum/maternity-pay-grant-period-consideration.enum';
import type { MaternityPayGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/enum/maternity-pay-grant-period-pendency-reason.enum';
import type { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';
import type { MaternityPayGrantCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/enum/maternity-pay-grant-category.enum';

export interface MaternityPayGrantPeriodEntityPropsInterface extends BaseEntityPropsInterface<MaternityPayGrantPeriodId> {
  startDate: Date;
  endDate?: Date | null;
  category: MaternityPayGrantCategoryEnum;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  pendencyReason?: MaternityPayGrantPeriodPendencyReasonEnum | null;
  typeOfContribution?: string | null;
  status: boolean;
  periodConsideration?: MaternityPayGrantPeriodConsiderationEnum | null;
  bondOrigin?: string | null;
  contributionAverage?: DecimalValue | null;
  impact?: string | null;
  gracePeriod?: number | null;
  complementViaMyInss?: boolean | null;
  maternityPayGrantId: MaternityPayGrantId;
}
