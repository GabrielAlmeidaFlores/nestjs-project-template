import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import { DisabilityRetirementPlanningInssBenefitEntityPropsInterface } from './disability-retirement-planning-inss-benefit.entity.props.interface';
import { DisabilityRetirementPlanningInssBenefitId } from './value-object/disability-retirement-planning-inss-benefit-id.value-object';

export class DisabilityRetirementPlanningInssBenefitEntity extends BaseEntity<DisabilityRetirementPlanningInssBenefitId> {
  protected readonly _type = DisabilityRetirementPlanningInssBenefitEntity.name;

  public readonly disabilityRetirementPlanning: DisabilityRetirementPlanningEntity;
  public readonly benefitNumber: string;

  public constructor(props: DisabilityRetirementPlanningInssBenefitEntityPropsInterface) {
    super(DisabilityRetirementPlanningInssBenefitId, props);
    this.disabilityRetirementPlanning = props.disabilityRetirementPlanning;
    this.benefitNumber = props.benefitNumber;
  }
}
