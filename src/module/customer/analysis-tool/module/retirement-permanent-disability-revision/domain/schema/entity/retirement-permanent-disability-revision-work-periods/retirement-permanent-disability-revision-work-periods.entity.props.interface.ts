import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/enum/retirement-permanent-disability-revision-work-periods-pendency-reason.enum';
import type { RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/enum/retirement-permanent-disability-revision-work-periods-period-consideration.enum';
import type { RetirementPermanentDisabilityRevisionWorkPeriodsId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/value-object/retirement-permanent-disability-revision-work-periods-id.value-object';

export interface RetirementPermanentDisabilityRevisionWorkPeriodsEntityPropsInterface
  extends BaseEntityPropsInterface<RetirementPermanentDisabilityRevisionWorkPeriodsId> {
  bondOrigin: string;
  startDate: Date;
  endDate?: Date | null;
  category: string;
  competenceBelowTheMinimum: boolean;
  pendencyReason?: RetirementPermanentDisabilityRevisionWorkPeriodsPendencyReasonEnum | null;
  periodConsideration?: RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum | null;
  contributionAverage?: DecimalValue | null;
  status: boolean;
  gracePeriod: number;
  retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId;
}
