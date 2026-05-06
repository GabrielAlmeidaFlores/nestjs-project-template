import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import type { RetirementPermanentDisabilityRejectionPeriodCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-category.enum';
import type { RetirementPermanentDisabilityRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-consideration.enum';
import type { RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-pendency-reason.enum';
import type { RetirementPermanentDisabilityRejectionPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-work-type.enum';
import type { RetirementPermanentDisabilityRejectionPeriodId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/value-object/retirement-permanent-disability-rejection-period-id/retirement-permanent-disability-rejection-period-id.value-object';

export interface RetirementPermanentDisabilityRejectionPeriodEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRejectionPeriodId> {
  bondOrigin?: string | null;
  category?: RetirementPermanentDisabilityRejectionPeriodCategoryEnum | null;
  activityDescription?: string | null;
  startDate: Date;
  endDate?: Date | null;
  workType: RetirementPermanentDisabilityRejectionPeriodWorkTypeEnum;
  impactMonths?: number | null;
  graceMonths?: number | null;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  contributionAverage?: DecimalValue | null;
  pendencyReason?: RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum | null;
  periodConsideration?: RetirementPermanentDisabilityRejectionPeriodConsiderationEnum | null;
  wantsToComplementViaMeuINSS?: boolean | null;
  status: boolean;
  local?: string | null;
  retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId;
}
