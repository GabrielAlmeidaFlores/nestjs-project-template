import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-earnings-history/value-object/death-benefit-period-earnings-history-id.value-object';

import type { DeathBenefitPeriodEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-earnings-history/death-benefit-period-earnings-history.entity.props.interface';
import type { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';

export class DeathBenefitPeriodEarningsHistoryEntity extends BaseEntity<DeathBenefitPeriodEarningsHistoryId> {
  public readonly competence: Date | null;
  public readonly remuneration: string | null;
  public readonly indicators: string | null;
  public readonly contribution: string | null;
  public readonly contributionSalary: string | null;
  public readonly analysis: string | null;
  public readonly paymentDate: Date | null;
  public readonly competenceBelowTheMinimum: boolean | null;
  public readonly deathBenefitPeriodId: DeathBenefitPeriodId;

  protected readonly _type = DeathBenefitPeriodEarningsHistoryEntity.name;

  public constructor(
    props: DeathBenefitPeriodEarningsHistoryEntityPropsInterface,
  ) {
    super(DeathBenefitPeriodEarningsHistoryId, props);
    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.analysis = props.analysis ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.deathBenefitPeriodId = props.deathBenefitPeriodId;
  }
}
