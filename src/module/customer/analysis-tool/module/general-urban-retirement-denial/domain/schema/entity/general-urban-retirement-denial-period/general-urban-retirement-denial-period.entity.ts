import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import { GeneralUrbanRetirementDenialPeriodId } from './value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';

import type { GeneralUrbanRetirementDenialPeriodCategoryEnum } from './enum/general-urban-retirement-denial-period-category.enum';
import type { GeneralUrbanRetirementDenialPeriodConsiderationEnum } from './enum/general-urban-retirement-denial-period-consideration.enum';
import type { GeneralUrbanRetirementDenialPeriodPendencyReasonEnum } from './enum/general-urban-retirement-denial-period-pendency-reason.enum';
import type { GeneralUrbanRetirementDenialPeriodWorkTypeEnum } from './enum/general-urban-retirement-denial-period-work-type.enum';
import type { GeneralUrbanRetirementDenialPeriodEntityPropsInterface } from './general-urban-retirement-denial-period.entity.props.interface';
import type { GeneralUrbanRetirementDenialId } from '../general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export class GeneralUrbanRetirementDenialPeriodEntity extends BaseEntity<GeneralUrbanRetirementDenialPeriodId> {
  public readonly bondOrigin: string | null;
  public readonly category: GeneralUrbanRetirementDenialPeriodCategoryEnum | null;
  public readonly activityDescription: string | null;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly workType: GeneralUrbanRetirementDenialPeriodWorkTypeEnum;
  public readonly impactMonths: number | null;
  public readonly graceMonths: number | null;
  public readonly isPendency: boolean;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly contributionAverage: DecimalValue | null;
  public readonly pendencyReason: GeneralUrbanRetirementDenialPeriodPendencyReasonEnum | null;
  public readonly periodConsideration: GeneralUrbanRetirementDenialPeriodConsiderationEnum | null;
  public readonly wantsToComplementViaMeuINSS: boolean | null;
  public readonly status: boolean;
  public readonly generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId;

  protected readonly _type = GeneralUrbanRetirementDenialPeriodEntity.name;

  public constructor(
    props: GeneralUrbanRetirementDenialPeriodEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementDenialPeriodId, props);
    this.bondOrigin = props.bondOrigin ?? null;
    this.category = props.category ?? null;
    this.activityDescription = props.activityDescription ?? null;
    this.startDate = props.startDate;
    this.endDate = props.endDate ?? null;
    this.workType = props.workType;
    this.impactMonths = props.impactMonths ?? null;
    this.graceMonths = props.graceMonths ?? null;
    this.isPendency = props.isPendency;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum;
    this.contributionAverage = props.contributionAverage ?? null;
    this.pendencyReason = props.pendencyReason ?? null;
    this.periodConsideration = props.periodConsideration ?? null;
    this.wantsToComplementViaMeuINSS =
      props.wantsToComplementViaMeuINSS ?? null;
    this.status = props.status;
    this.generalUrbanRetirementDenialId = props.generalUrbanRetirementDenialId;
  }
}
