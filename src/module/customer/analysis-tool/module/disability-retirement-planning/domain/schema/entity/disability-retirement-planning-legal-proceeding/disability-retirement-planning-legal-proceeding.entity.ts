import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningLegalProceedingId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-legal-proceeding/value-object/disability-retirement-planning-legal-proceeding-id.value-object';

import type { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import type { DisabilityRetirementPlanningLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-legal-proceeding/disability-retirement-planning-legal-proceeding.entity.props.interface';

export class DisabilityRetirementPlanningLegalProceedingEntity extends BaseEntity<DisabilityRetirementPlanningLegalProceedingId> {
  public readonly disabilityRetirementPlanning: DisabilityRetirementPlanningEntity;
  public readonly legalProceedingNumber: string;

  protected readonly _type =
    DisabilityRetirementPlanningLegalProceedingEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningLegalProceedingEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningLegalProceedingId, props);
    this.disabilityRetirementPlanning = props.disabilityRetirementPlanning;
    this.legalProceedingNumber = props.legalProceedingNumber;
  }
}
