import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';
import type { DeathBenefitPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-earnings-history/value-object/death-benefit-period-earnings-history-id.value-object';

export interface DeathBenefitPeriodEarningsHistoryEntityPropsInterface
  extends BaseEntityPropsInterface<DeathBenefitPeriodEarningsHistoryId> {
  competence?: Date | null;
  remuneration?: string | null;
  indicators?: string | null;
  contribution?: string | null;
  contributionSalary?: string | null;
  analysis?: string | null;
  paymentDate?: Date | null;
  competenceBelowTheMinimum?: boolean | null;
  deathBenefitPeriodId: DeathBenefitPeriodId;
}
