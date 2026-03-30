import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningGrantInssBenefitId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-inss-benefit/value-object/disability-retirement-planning-grant-inss-benefit-id.value-object';

import type { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import type { DisabilityRetirementPlanningGrantInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-inss-benefit/disability-retirement-planning-grant-inss-benefit.entity.props.interface';

export class DisabilityRetirementPlanningGrantInssBenefitEntity extends BaseEntity<DisabilityRetirementPlanningGrantInssBenefitId> {
  public readonly inssBenefit: string;
  public readonly disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId;

  protected readonly _type =
    DisabilityRetirementPlanningGrantInssBenefitEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningGrantInssBenefitEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningGrantInssBenefitId, props);
    this.inssBenefit = props.inssBenefit;
    this.disabilityRetirementPlanningGrantId =
      props.disabilityRetirementPlanningGrantId;
  }
}
