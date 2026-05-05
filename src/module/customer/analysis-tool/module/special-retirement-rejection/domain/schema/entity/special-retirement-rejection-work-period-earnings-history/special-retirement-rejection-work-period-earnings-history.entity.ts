import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-earnings-history/value-object/special-retirement-rejection-work-period-earnings-history-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { SpecialRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/value-object/special-retirement-rejection-work-period-id.value-object';
import type { SpecialRetirementRejectionWorkPeriodEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-earnings-history/special-retirement-rejection-work-period-earnings-history.entity.props.interface';

export class SpecialRetirementRejectionWorkPeriodEarningsHistoryEntity extends BaseEntity<SpecialRetirementRejectionWorkPeriodEarningsHistoryId> {
  public readonly competence: Date | null;
  public readonly remuneration: DecimalValue | null;
  public readonly indicators: string | null;
  public readonly paymentDate: Date | null;
  public readonly contribution: DecimalValue | null;
  public readonly contributionSalary: DecimalValue | null;
  public readonly competenceBelowTheMinimum: boolean | null;
  public readonly specialRetirementRejectionWorkPeriodId: SpecialRetirementRejectionWorkPeriodId | null;

  protected readonly _type =
    SpecialRetirementRejectionWorkPeriodEarningsHistoryEntity.name;

  public constructor(
    props: SpecialRetirementRejectionWorkPeriodEarningsHistoryEntityPropsInterface,
  ) {
    super(SpecialRetirementRejectionWorkPeriodEarningsHistoryId, props);
    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.specialRetirementRejectionWorkPeriodId =
      props.specialRetirementRejectionWorkPeriodId ?? null;
  }
}
