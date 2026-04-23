import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AccidentBenefitRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-earnings-history/value-object/accident-benefit-rejection-work-period-earnings-history-id.value-object';

import type { AccidentBenefitRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/value-object/accident-benefit-rejection-work-period-id.value-object';
import type { AccidentBenefitRejectionWorkPeriodEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-earnings-history/accident-benefit-rejection-work-period-earnings-history.entity.props.interface';

export class AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity extends BaseEntity<AccidentBenefitRejectionWorkPeriodEarningsHistoryId> {
  public readonly competence: Date | null;
  public readonly remuneration: string | null;
  public readonly indicators: string | null;
  public readonly paymentDate: Date | null;
  public readonly contribution: string | null;
  public readonly contributionSalary: string | null;
  public readonly competenceBelowTheMinimum: boolean | null;
  public readonly accidentBenefitRejectionWorkPeriodId: AccidentBenefitRejectionWorkPeriodId | null;

  protected readonly _type =
    AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity.name;

  public constructor(
    props: AccidentBenefitRejectionWorkPeriodEarningsHistoryEntityPropsInterface,
  ) {
    super(AccidentBenefitRejectionWorkPeriodEarningsHistoryId, props);
    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.accidentBenefitRejectionWorkPeriodId =
      props.accidentBenefitRejectionWorkPeriodId ?? null;
  }
}
