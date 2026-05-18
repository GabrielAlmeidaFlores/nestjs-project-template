import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningGrantLegalProceedingId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-legal-proceeding/value-object/disability-retirement-planning-grant-legal-proceeding-id.value-object';

import type { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import type { DisabilityRetirementPlanningGrantLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-legal-proceeding/disability-retirement-planning-grant-legal-proceeding.entity.props.interface';

export class DisabilityRetirementPlanningGrantLegalProceedingEntity extends BaseEntity<DisabilityRetirementPlanningGrantLegalProceedingId> {
  public readonly legalProceedingNumber: string;
  public readonly disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId;

  protected readonly _type =
    DisabilityRetirementPlanningGrantLegalProceedingEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningGrantLegalProceedingEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningGrantLegalProceedingId, props);
    this.legalProceedingNumber = props.legalProceedingNumber;
    this.disabilityRetirementPlanningGrantId =
      props.disabilityRetirementPlanningGrantId;
  }
}
