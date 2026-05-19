import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { DisabilityRetirementPlanningGrantCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/enum/disability-retirement-planning-grant-category.enum';
import type { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import type { DisabilityRetirementPlanningGrantDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-degree.enum';
import type { DisabilityRetirementPlanningGrantPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/disability-retirement-planning-grant-period.entity.props.interface';
import type { DisabilityRetirementPlanningGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-consideration.enum';
import type { DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-pendency-reason.enum';

export class DisabilityRetirementPlanningGrantPeriodEntity extends BaseEntity<DisabilityRetirementPlanningGrantPeriodId> {
  public readonly contributionAverage: DecimalValue | null;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly category: DisabilityRetirementPlanningGrantCategoryEnum;
  public readonly isPendency: boolean;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly pendencyReason: DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum | null;
  public readonly typeOfContribution: string | null;
  public readonly status: boolean;
  public readonly disabilityStatus: DisabilityRetirementPlanningGrantDisabilityDegreeEnum | null;
  public readonly periodConsideration: DisabilityRetirementPlanningGrantPeriodConsiderationEnum | null;
  public readonly bondOrigin: string | null;
  public readonly disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId;

  protected readonly _type = DisabilityRetirementPlanningGrantPeriodEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningGrantPeriodEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningGrantPeriodId, props);
    this.contributionAverage = props.contributionAverage ?? null;
    this.startDate = props.startDate;
    this.endDate = props.endDate ?? null;
    this.category = props.category;
    this.isPendency = props.isPendency;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum;
    this.pendencyReason = props.pendencyReason ?? null;
    this.typeOfContribution = props.typeOfContribution ?? null;
    this.status = props.status;
    this.disabilityStatus = props.disabilityStatus ?? null;
    this.periodConsideration = props.periodConsideration ?? null;
    this.bondOrigin = props.bondOrigin ?? null;
    this.disabilityRetirementPlanningGrantId =
      props.disabilityRetirementPlanningGrantId;
  }
}
