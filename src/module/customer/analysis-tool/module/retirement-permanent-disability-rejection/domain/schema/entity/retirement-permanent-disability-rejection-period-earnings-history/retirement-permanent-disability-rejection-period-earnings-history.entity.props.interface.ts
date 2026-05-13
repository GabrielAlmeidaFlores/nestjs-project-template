import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRejectionPeriodId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/value-object/retirement-permanent-disability-rejection-period-id/retirement-permanent-disability-rejection-period-id.value-object';
import type { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-earnings-history/value-object/retirement-permanent-disability-rejection-period-earnings-history-id/retirement-permanent-disability-rejection-period-earnings-history-id.value-object';

export interface RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRejectionPeriodEarningsHistoryId> {
  competence?: Date | null;
  value?: string | null;
  retirementPermanentDisabilityRejectionPeriodId: RetirementPermanentDisabilityRejectionPeriodId;
}
