import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitGrantPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-earnings-history/value-object/death-benefit-grant-period-earnings-history-id.value-object';

import type { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';
import type { DeathBenefitGrantPeriodEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-earnings-history/death-benefit-grant-period-earnings-history.entity.props.interface';

export class DeathBenefitGrantPeriodEarningsHistoryEntity extends BaseEntity<DeathBenefitGrantPeriodEarningsHistoryId> {
  public readonly competence: Date | null;
  public readonly remuneration: string | null;
  public readonly indicators: string | null;
  public readonly contribution: string | null;
  public readonly contributionSalary: string | null;
  public readonly analysis: string | null;
  public readonly paymentDate: Date | null;
  public readonly competenceBelowTheMinimum: boolean | null;
  public readonly deathBenefitGrantPeriodId: DeathBenefitGrantPeriodId;

  protected readonly _type = DeathBenefitGrantPeriodEarningsHistoryEntity.name;

  public constructor(
    props: DeathBenefitGrantPeriodEarningsHistoryEntityPropsInterface,
  ) {
    super(DeathBenefitGrantPeriodEarningsHistoryId, props);
    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.analysis = props.analysis ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.deathBenefitGrantPeriodId = props.deathBenefitGrantPeriodId;
  }
}
