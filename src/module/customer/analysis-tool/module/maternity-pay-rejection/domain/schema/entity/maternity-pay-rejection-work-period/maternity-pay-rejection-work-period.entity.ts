import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MaternityPayRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/value-object/maternity-pay-rejection-work-period-id.value-object';

import type { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import type { MaternityPayRejectionWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/enum/maternity-pay-rejection-work-period-job-type.enum';
import type { MaternityPayRejectionWorkPeriodPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/enum/maternity-pay-rejection-work-period-period-consideration.enum';
import type { MaternityPayRejectionWorkPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/maternity-pay-rejection-work-period.entity.props.interface';

export class MaternityPayRejectionWorkPeriodEntity extends BaseEntity<MaternityPayRejectionWorkPeriodId> {
  public readonly bondOrigin: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly category: string | null;
  public readonly competenceBelowTheMinimum: boolean | null;
  public readonly pendencyReason: string | null;
  public readonly periodConsideration: MaternityPayRejectionWorkPeriodPeriodConsiderationEnum | null;
  public readonly contributionAverage: string | null;
  public readonly status: string | null;
  public readonly gracePeriod: string | null;
  public readonly jobType: MaternityPayRejectionWorkPeriodJobTypeEnum | null;
  public readonly activityDescription: string | null;
  public readonly maternityPayRejectionId: MaternityPayRejectionId | null;

  protected readonly _type = MaternityPayRejectionWorkPeriodEntity.name;

  public constructor(
    props: MaternityPayRejectionWorkPeriodEntityPropsInterface,
  ) {
    super(MaternityPayRejectionWorkPeriodId, props);
    this.bondOrigin = props.bondOrigin ?? null;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.category = props.category ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.pendencyReason = props.pendencyReason ?? null;
    this.periodConsideration = props.periodConsideration ?? null;
    this.contributionAverage = props.contributionAverage ?? null;
    this.status = props.status ?? null;
    this.gracePeriod = props.gracePeriod ?? null;
    this.jobType = props.jobType ?? null;
    this.activityDescription = props.activityDescription ?? null;
    this.maternityPayRejectionId = props.maternityPayRejectionId ?? null;
  }
}
