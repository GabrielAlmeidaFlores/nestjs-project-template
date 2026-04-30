import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MaternityPayRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-earnings-history/value-object/maternity-pay-rejection-work-period-earnings-history-id.value-object';

import type { MaternityPayRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/value-object/maternity-pay-rejection-work-period-id.value-object';
import type { MaternityPayRejectionWorkPeriodEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-earnings-history/maternity-pay-rejection-work-period-earnings-history.entity.props.interface';

export class MaternityPayRejectionWorkPeriodEarningsHistoryEntity extends BaseEntity<MaternityPayRejectionWorkPeriodEarningsHistoryId> {
  public readonly competence: Date | null;
  public readonly remuneration: string | null;
  public readonly indicators: string | null;
  public readonly paymentDate: Date | null;
  public readonly contribution: string | null;
  public readonly contributionSalary: string | null;
  public readonly competenceBelowTheMinimum: string | null;
  public readonly maternityPayRejectionWorkPeriodId: MaternityPayRejectionWorkPeriodId | null;

  protected readonly _type =
    MaternityPayRejectionWorkPeriodEarningsHistoryEntity.name;

  public constructor(
    props: MaternityPayRejectionWorkPeriodEarningsHistoryEntityPropsInterface,
  ) {
    super(MaternityPayRejectionWorkPeriodEarningsHistoryId, props);
    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.maternityPayRejectionWorkPeriodId =
      props.maternityPayRejectionWorkPeriodId ?? null;
  }
}
