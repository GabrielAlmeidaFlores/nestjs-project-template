import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-earnings-history/value-object/rural-or-hybrid-retirement-rejection-work-period-earnings-history-id.value-object';

import type { RuralOrHybridRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/value-object/rural-or-hybrid-retirement-rejection-work-period-id.value-object';
import type { RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-earnings-history/rural-or-hybrid-retirement-rejection-work-period-earnings-history.entity.props.interface';

export class RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryEntity extends BaseEntity<RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryId> {
  public readonly competence: string | null;
  public readonly remuneration: string | null;
  public readonly indicators: string | null;
  public readonly paymentDate: Date | null;
  public readonly contribution: string | null;
  public readonly contributionSalary: string | null;
  public readonly competenceBelowMinimum: boolean | null;
  public readonly ruralOrHybridRetirementRejectionWorkPeriodId: RuralOrHybridRetirementRejectionWorkPeriodId;

  protected readonly _type =
    RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryEntity.name;

  public constructor(
    props: RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryId, props);
    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.competenceBelowMinimum = props.competenceBelowMinimum ?? null;
    this.ruralOrHybridRetirementRejectionWorkPeriodId =
      props.ruralOrHybridRetirementRejectionWorkPeriodId;
  }
}
