import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitRejectionPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-earnings-history/value-object/death-benefit-rejection-period-earnings-history-id.value-object';

import type { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';
import type { DeathBenefitRejectionPeriodEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-earnings-history/death-benefit-rejection-period-earnings-history.entity.props.interface';

export class DeathBenefitRejectionPeriodEarningsHistoryEntity extends BaseEntity<DeathBenefitRejectionPeriodEarningsHistoryId> {
  public readonly competence: Date | null;
  public readonly remuneration: string | null;
  public readonly indicators: string | null;
  public readonly contribution: string | null;
  public readonly contributionSalary: string | null;
  public readonly analysis: string | null;
  public readonly paymentDate: Date | null;
  public readonly competenceBelowTheMinimum: boolean | null;
  public readonly deathBenefitRejectionPeriodId: DeathBenefitRejectionPeriodId;

  protected readonly _type =
    DeathBenefitRejectionPeriodEarningsHistoryEntity.name;

  public constructor(
    props: DeathBenefitRejectionPeriodEarningsHistoryEntityPropsInterface,
  ) {
    super(DeathBenefitRejectionPeriodEarningsHistoryId, props);
    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.analysis = props.analysis ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.deathBenefitRejectionPeriodId = props.deathBenefitRejectionPeriodId;
  }
}
