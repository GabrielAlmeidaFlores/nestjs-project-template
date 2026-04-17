import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningRejectionInssBenefitId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-inss-benefit/value-object/disability-retirement-planning-rejection-inss-benefit-id.value-object';

import type { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import type { DisabilityRetirementPlanningRejectionInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-inss-benefit/disability-retirement-planning-rejection-inss-benefit.entity.props.interface';

export class DisabilityRetirementPlanningRejectionInssBenefitEntity extends BaseEntity<DisabilityRetirementPlanningRejectionInssBenefitId> {
  public readonly inssBenefit: string;
  public readonly disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId;

  protected readonly _type =
    DisabilityRetirementPlanningRejectionInssBenefitEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningRejectionInssBenefitEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningRejectionInssBenefitId, props);
    this.inssBenefit = props.inssBenefit;
    this.disabilityRetirementPlanningRejectionId =
      props.disabilityRetirementPlanningRejectionId;
  }
}
