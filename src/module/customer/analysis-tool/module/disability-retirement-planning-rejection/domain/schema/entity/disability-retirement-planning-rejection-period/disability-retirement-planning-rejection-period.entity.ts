import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningRejectionPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/value-object/disability-retirement-planning-rejection-period-id/disability-retirement-planning-rejection-period-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import type { DisabilityRetirementPlanningRejectionPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/disability-retirement-planning-rejection-period.entity.props.interface';
import type { DisabilityRetirementPlanningRejectionPeriodCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-category.enum';
import type { DisabilityRetirementPlanningRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-consideration.enum';
import type { DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-pcd-status.enum';
import type { DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-pendency-reason.enum';
import type { DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-work-type.enum';

export class DisabilityRetirementPlanningRejectionPeriodEntity extends BaseEntity<DisabilityRetirementPlanningRejectionPeriodId> {
  public readonly bondOrigin: string | null;
  public readonly category: DisabilityRetirementPlanningRejectionPeriodCategoryEnum | null;
  public readonly activityDescription: string | null;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly workType: DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum;
  public readonly impactMonths: number | null;
  public readonly graceMonths: number | null;
  public readonly isPendency: boolean;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly contributionAverage: DecimalValue | null;
  public readonly pendencyReason: DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum | null;
  public readonly periodConsideration: DisabilityRetirementPlanningRejectionPeriodConsiderationEnum | null;
  public readonly wantsToComplementViaMeuINSS: boolean | null;
  public readonly status: boolean;
  public readonly pcdStatus: DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum | null;
  public readonly local: string | null;
  public readonly disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId;

  protected readonly _type =
    DisabilityRetirementPlanningRejectionPeriodEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningRejectionPeriodEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningRejectionPeriodId, props);
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
    this.pcdStatus = props.pcdStatus ?? null;
    this.local = props.local ?? null;
    this.disabilityRetirementPlanningRejectionId =
      props.disabilityRetirementPlanningRejectionId;
  }
}
