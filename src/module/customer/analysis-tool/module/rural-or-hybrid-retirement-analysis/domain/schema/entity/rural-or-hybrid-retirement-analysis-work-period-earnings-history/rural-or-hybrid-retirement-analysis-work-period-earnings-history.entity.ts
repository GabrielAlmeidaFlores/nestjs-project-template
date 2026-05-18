import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-earnings-history/value-object/rural-or-hybrid-retirement-analysis-work-period-earnings-history-id.value-object';

import type { RuralOrHybridRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/value-object/rural-or-hybrid-retirement-analysis-work-period-id.value-object';
import type { RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-earnings-history/rural-or-hybrid-retirement-analysis-work-period-earnings-history.entity.props.interface';

export class RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryEntity extends BaseEntity<RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryId> {
  public readonly competence: string | null;
  public readonly remuneration: string | null;
  public readonly indicators: string | null;
  public readonly paymentDate: Date | null;
  public readonly contribution: string | null;
  public readonly contributionSalary: string | null;
  public readonly competenceBelowMinimum: boolean | null;
  public readonly ruralOrHybridRetirementAnalysisWorkPeriodId: RuralOrHybridRetirementAnalysisWorkPeriodId;

  protected readonly _type =
    RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryEntity.name;

  public constructor(
    props: RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryId, props);
    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.competenceBelowMinimum = props.competenceBelowMinimum ?? null;
    this.ruralOrHybridRetirementAnalysisWorkPeriodId =
      props.ruralOrHybridRetirementAnalysisWorkPeriodId;
  }
}
