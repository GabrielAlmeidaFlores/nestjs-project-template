import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningInssBenefitId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-inss-benefit/value-object/disability-retirement-planning-inss-benefit-id.value-object';

import type { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import type { DisabilityRetirementPlanningInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-inss-benefit/disability-retirement-planning-inss-benefit.entity.props.interface';

export class DisabilityRetirementPlanningInssBenefitEntity extends BaseEntity<DisabilityRetirementPlanningInssBenefitId> {
  public readonly disabilityRetirementPlanning: DisabilityRetirementPlanningEntity;
  public readonly benefitNumber: string;

  protected readonly _type = DisabilityRetirementPlanningInssBenefitEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningInssBenefitEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningInssBenefitId, props);
    this.disabilityRetirementPlanning = props.disabilityRetirementPlanning;
    this.benefitNumber = props.benefitNumber;
  }
}
