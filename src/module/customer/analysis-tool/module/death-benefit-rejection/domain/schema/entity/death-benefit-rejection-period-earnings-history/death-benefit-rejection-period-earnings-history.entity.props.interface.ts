import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';
import type { DeathBenefitRejectionPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-earnings-history/value-object/death-benefit-rejection-period-earnings-history-id.value-object';

export interface DeathBenefitRejectionPeriodEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitRejectionPeriodEarningsHistoryId> {
  competence?: Date | null;
  remuneration?: string | null;
  indicators?: string | null;
  contribution?: string | null;
  contributionSalary?: string | null;
  analysis?: string | null;
  paymentDate?: Date | null;
  competenceBelowTheMinimum?: boolean | null;
  deathBenefitRejectionPeriodId: DeathBenefitRejectionPeriodId;
}
