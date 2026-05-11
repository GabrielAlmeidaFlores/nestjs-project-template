import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRejectionPeriodId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/value-object/retirement-permanent-disability-rejection-period-id/retirement-permanent-disability-rejection-period-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import type { RetirementPermanentDisabilityRejectionPeriodCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-category.enum';
import type { RetirementPermanentDisabilityRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-consideration.enum';
import type { RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-pendency-reason.enum';
import type { RetirementPermanentDisabilityRejectionPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-work-type.enum';
import type { RetirementPermanentDisabilityRejectionPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/retirement-permanent-disability-rejection-period.entity.props.interface';

export class RetirementPermanentDisabilityRejectionPeriodEntity extends BaseEntity<RetirementPermanentDisabilityRejectionPeriodId> {
  public readonly bondOrigin: string | null;
  public readonly category: RetirementPermanentDisabilityRejectionPeriodCategoryEnum | null;
  public readonly activityDescription: string | null;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly workType: RetirementPermanentDisabilityRejectionPeriodWorkTypeEnum;
  public readonly isPendency: boolean;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly contributionAverage: DecimalValue | null;
  public readonly pendencyReason: RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum | null;
  public readonly periodConsideration: RetirementPermanentDisabilityRejectionPeriodConsiderationEnum | null;
  public readonly wantsToComplementViaMeuINSS: boolean | null;
  public readonly status: boolean;
  public readonly local: string | null;
  public readonly retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId;

  protected readonly _type =
    RetirementPermanentDisabilityRejectionPeriodEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRejectionPeriodEntityPropsInterface,
  ) {
    super(RetirementPermanentDisabilityRejectionPeriodId, props);
    this.bondOrigin = props.bondOrigin ?? null;
    this.category = props.category ?? null;
    this.activityDescription = props.activityDescription ?? null;
    this.startDate = props.startDate;
    this.endDate = props.endDate ?? null;
    this.workType = props.workType;
    this.isPendency = props.isPendency;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum;
    this.contributionAverage = props.contributionAverage ?? null;
    this.pendencyReason = props.pendencyReason ?? null;
    this.periodConsideration = props.periodConsideration ?? null;
    this.wantsToComplementViaMeuINSS =
      props.wantsToComplementViaMeuINSS ?? null;
    this.status = props.status;
    this.local = props.local ?? null;
    this.retirementPermanentDisabilityRejectionId =
      props.retirementPermanentDisabilityRejectionId;
  }
}
