import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';
import type { DeathBenefitGrantPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-earnings-history/value-object/death-benefit-grant-period-earnings-history-id.value-object';

export interface DeathBenefitGrantPeriodEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitGrantPeriodEarningsHistoryId> {
  competence?: Date | null;
  remuneration?: string | null;
  indicators?: string | null;
  contribution?: string | null;
  contributionSalary?: string | null;
  analysis?: string | null;
  paymentDate?: Date | null;
  competenceBelowTheMinimum?: boolean | null;
  deathBenefitGrantPeriodId: DeathBenefitGrantPeriodId;
}
