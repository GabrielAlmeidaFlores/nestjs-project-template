import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/value-object/temporary-disability-benefits-terminated-work-periods-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { TemporaryDisabilityBenefitsTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/enum/temporary-disability-benefits-terminated-category.enum';
import type { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/enum/temporary-disability-benefits-terminated-work-periods-pendency-reason.enum';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/enum/temporary-disability-benefits-terminated-work-periods-period-consideration.enum';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/temporary-disability-benefits-terminated-work-periods.entity.props.interface';

export class TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntity extends BaseEntity<TemporaryDisabilityBenefitsTerminatedWorkPeriodsId> {
  public readonly bondOrigin: string | null;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly category: TemporaryDisabilityBenefitsTerminatedCategoryEnum | null;
  public readonly activityDescription: string | null;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly pendencyReason: TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum | null;
  public readonly periodConsideration: TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum | null;
  public readonly contributionAverage: DecimalValue | null;
  public readonly impactMonths: number | null;
  public readonly gracePeriod: number | null;
  public readonly isPendency: boolean;
  public readonly wantsToComplementViaMeuINSS: boolean | null;
  public readonly status: boolean;
  public readonly isManualPeriod: boolean;
  public readonly temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId;

  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsTerminatedWorkPeriodsId, props);
    this.bondOrigin = props.bondOrigin ?? null;
    this.startDate = props.startDate;
    this.endDate = props.endDate ?? null;
    this.category = props.category ?? null;
    this.activityDescription = props.activityDescription ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum;
    this.pendencyReason = props.pendencyReason ?? null;
    this.periodConsideration = props.periodConsideration ?? null;
    this.contributionAverage = props.contributionAverage ?? null;
    this.impactMonths = props.impactMonths ?? null;
    this.gracePeriod = props.gracePeriod ?? null;
    this.isPendency = props.isPendency;
    this.wantsToComplementViaMeuINSS =
      props.wantsToComplementViaMeuINSS ?? null;
    this.status = props.status;
    this.isManualPeriod = props.isManualPeriod ?? false;
    this.temporaryDisabilityBenefitsTerminatedId =
      props.temporaryDisabilityBenefitsTerminatedId;
  }
}
