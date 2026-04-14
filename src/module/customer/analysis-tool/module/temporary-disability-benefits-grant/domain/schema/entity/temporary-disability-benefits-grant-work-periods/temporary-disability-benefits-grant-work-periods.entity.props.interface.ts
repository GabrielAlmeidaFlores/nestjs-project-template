import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { TemporaryDisabilityBenefitsGrantCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/enum/temporary-disability-benefits-grant-category.enum';
import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/enum/temporary-disability-benefits-grant-work-periods-pendency-reason.enum';
import type { TemporaryDisabilityBenefitsGrantWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/enum/temporary-disability-benefits-grant-work-periods-period-consideration.enum';
import type { TemporaryDisabilityBenefitsGrantWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/value-object/temporary-disability-benefits-grant-work-periods-id.value-object';

export interface TemporaryDisabilityBenefitsGrantWorkPeriodsEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsGrantWorkPeriodsId> {
  bondOrigin: string;
  startDate: Date;
  endDate?: Date | null;
  category: TemporaryDisabilityBenefitsGrantCategoryEnum;
  competenceBelowTheMinimum: boolean;
  pendencyReason?: TemporaryDisabilityBenefitsGrantWorkPeriodsPendencyReasonEnum | null;
  periodConsideration?: TemporaryDisabilityBenefitsGrantWorkPeriodsPeriodConsiderationEnum | null;
  contributionAverage?: DecimalValue | null;
  status: boolean;
  gracePeriod: number;
  temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId;
}
