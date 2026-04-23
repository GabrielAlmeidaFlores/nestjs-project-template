import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AccidentBenefitRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/value-object/accident-benefit-rejection-work-period-id.value-object';
import type { AccidentBenefitRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-earnings-history/value-object/accident-benefit-rejection-work-period-earnings-history-id.value-object';

export interface AccidentBenefitRejectionWorkPeriodEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<AccidentBenefitRejectionWorkPeriodEarningsHistoryId> {
  competence?: Date | null;
  remuneration?: string | null;
  indicators?: string | null;
  paymentDate?: Date | null;
  contribution?: string | null;
  contributionSalary?: string | null;
  competenceBelowTheMinimum?: boolean | null;
  accidentBenefitRejectionWorkPeriodId?: AccidentBenefitRejectionWorkPeriodId | null;
}
