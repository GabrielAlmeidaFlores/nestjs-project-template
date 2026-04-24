import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MaternityPayGrantEarningsHistoryId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-earnings-history/value-object/maternity-pay-grant-earnings-history-id.value-object';

import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { MaternityPayGrantEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-earnings-history/maternity-pay-grant-earnings-history.entity.props.interface';
import type { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';

export class MaternityPayGrantEarningsHistoryEntity extends BaseEntity<MaternityPayGrantEarningsHistoryId> {
  public readonly competence: Date | null;
  public readonly remuneration: string | null;
  public readonly indicators: string | null;
  public readonly paymentDate: Date | null;
  public readonly contribution: string | null;
  public readonly contributionSalary: string | null;
  public readonly analysis: string | null;
  public readonly competenceBelowTheMinimum: boolean | null;
  public readonly maternityPayGrantId: MaternityPayGrantId;
  public readonly maternityPayGrantPeriodId: MaternityPayGrantPeriodId | null;

  protected readonly _type = MaternityPayGrantEarningsHistoryEntity.name;

  public constructor(
    props: MaternityPayGrantEarningsHistoryEntityPropsInterface,
  ) {
    super(MaternityPayGrantEarningsHistoryId, props);
    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.analysis = props.analysis ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.maternityPayGrantId = props.maternityPayGrantId;
    this.maternityPayGrantPeriodId = props.maternityPayGrantPeriodId ?? null;
  }
}
