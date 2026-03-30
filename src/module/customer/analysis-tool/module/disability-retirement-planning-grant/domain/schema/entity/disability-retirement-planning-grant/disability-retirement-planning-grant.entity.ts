import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';

import type { DisabilityRetirementPlanningGrantEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/disability-retirement-planning-grant.entity.props.interface';
import type { DisabilityRetirementPlanningGrantCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/enum/disability-retirement-planning-grant-category.enum';
import type { DisabilityRetirementPlanningGrantResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/value-object/disability-retirement-planning-grant-result-id.value-object';

export class DisabilityRetirementPlanningGrantEntity extends BaseEntity<DisabilityRetirementPlanningGrantId> {
  public readonly category: DisabilityRetirementPlanningGrantCategoryEnum;
  public readonly analysisName: string | null;
  public readonly longPrizeDisability: boolean;
  public readonly disabilityRetirementPlanningGrantResultId: DisabilityRetirementPlanningGrantResultId | null;

  protected readonly _type = DisabilityRetirementPlanningGrantEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningGrantEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningGrantId, props);
    this.category = props.category;
    this.analysisName = props.analysisName ?? null;
    this.longPrizeDisability = props.longPrizeDisability;
    this.disabilityRetirementPlanningGrantResultId =
      props.disabilityRetirementPlanningGrantResultId ?? null;
  }
}
