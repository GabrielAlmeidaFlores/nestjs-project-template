import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { TemporaryDisabilityBenefitsTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/enum/temporary-disability-benefits-terminated-category.enum';
import type { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/enum/temporary-disability-benefits-terminated-work-periods-pendency-reason.enum';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/enum/temporary-disability-benefits-terminated-work-periods-period-consideration.enum';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/value-object/temporary-disability-benefits-terminated-work-periods-id.value-object';

export interface TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsTerminatedWorkPeriodsId> {
  bondOrigin?: string | null;
  startDate: Date;
  endDate?: Date | null;
  category?: TemporaryDisabilityBenefitsTerminatedCategoryEnum | null;
  activityDescription?: string | null;
  competenceBelowTheMinimum: boolean;
  pendencyReason?: TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum | null;
  periodConsideration?: TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum | null;
  contributionAverage?: DecimalValue | null;
  impactMonths?: number | null;
  gracePeriod?: number | null;
  isPendency: boolean;
  wantsToComplementViaMeuINSS?: boolean | null;
  status: boolean;
  isManualPeriod?: boolean | null;
  temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId;
}
