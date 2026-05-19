import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/value-object/temporary-disability-benefits-grant-work-periods-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { TemporaryDisabilityBenefitsGrantCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/enum/temporary-disability-benefits-grant-category.enum';
import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/enum/temporary-disability-benefits-grant-work-periods-pendency-reason.enum';
import type { TemporaryDisabilityBenefitsGrantWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/enum/temporary-disability-benefits-grant-work-periods-period-consideration.enum';
import type { TemporaryDisabilityBenefitsGrantWorkPeriodsEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/temporary-disability-benefits-grant-work-periods.entity.props.interface';

export class TemporaryDisabilityBenefitsGrantWorkPeriodsEntity extends BaseEntity<TemporaryDisabilityBenefitsGrantWorkPeriodsId> {
  public readonly bondOrigin: string;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly category: TemporaryDisabilityBenefitsGrantCategoryEnum;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly pendencyReason: TemporaryDisabilityBenefitsGrantWorkPeriodsPendencyReasonEnum | null;
  public readonly periodConsideration: TemporaryDisabilityBenefitsGrantWorkPeriodsPeriodConsiderationEnum | null;
  public readonly contributionAverage: DecimalValue | null;
  public readonly status: boolean;
  public readonly gracePeriod: number;
  public readonly temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId;

  protected readonly _type =
    TemporaryDisabilityBenefitsGrantWorkPeriodsEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsGrantWorkPeriodsEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsGrantWorkPeriodsId, props);
    this.bondOrigin = props.bondOrigin;
    this.startDate = props.startDate;
    this.endDate = props.endDate ?? null;
    this.category = props.category;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum;
    this.pendencyReason = props.pendencyReason ?? null;
    this.periodConsideration = props.periodConsideration ?? null;
    this.contributionAverage = props.contributionAverage ?? null;
    this.status = props.status;
    this.gracePeriod = props.gracePeriod;
    this.temporaryDisabilityBenefitsGrantId =
      props.temporaryDisabilityBenefitsGrantId;
  }
}
