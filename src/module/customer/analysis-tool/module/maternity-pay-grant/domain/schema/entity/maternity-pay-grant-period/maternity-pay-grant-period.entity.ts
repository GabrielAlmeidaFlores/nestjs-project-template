import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { MaternityPayGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/enum/maternity-pay-grant-period-consideration.enum';
import type { MaternityPayGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/enum/maternity-pay-grant-period-pendency-reason.enum';
import type { MaternityPayGrantPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/maternity-pay-grant-period.entity.props.interface';
import type { MaternityPayGrantCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/enum/maternity-pay-grant-category.enum';

export class MaternityPayGrantPeriodEntity extends BaseEntity<MaternityPayGrantPeriodId> {
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly category: MaternityPayGrantCategoryEnum;
  public readonly isPendency: boolean;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly pendencyReason: MaternityPayGrantPeriodPendencyReasonEnum | null;
  public readonly typeOfContribution: string | null;
  public readonly status: boolean;
  public readonly periodConsideration: MaternityPayGrantPeriodConsiderationEnum | null;
  public readonly bondOrigin: string | null;
  public readonly contributionAverage: DecimalValue | null;
  public readonly impact: string | null;
  public readonly gracePeriod: number | null;
  public readonly complementViaMyInss: boolean | null;
  public readonly maternityPayGrantId: MaternityPayGrantId;

  protected readonly _type = MaternityPayGrantPeriodEntity.name;

  public constructor(props: MaternityPayGrantPeriodEntityPropsInterface) {
    super(MaternityPayGrantPeriodId, props);
    this.startDate = props.startDate;
    this.endDate = props.endDate ?? null;
    this.category = props.category;
    this.isPendency = props.isPendency;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum;
    this.pendencyReason = props.pendencyReason ?? null;
    this.typeOfContribution = props.typeOfContribution ?? null;
    this.status = props.status;
    this.periodConsideration = props.periodConsideration ?? null;
    this.bondOrigin = props.bondOrigin ?? null;
    this.contributionAverage = props.contributionAverage ?? null;
    this.impact = props.impact ?? null;
    this.gracePeriod = props.gracePeriod ?? null;
    this.complementViaMyInss = props.complementViaMyInss ?? null;
    this.maternityPayGrantId = props.maternityPayGrantId;
  }
}
