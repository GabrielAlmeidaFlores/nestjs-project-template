import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningPeriodDisabilityDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability-document/value-object/disability-retirement-planning-period-disability-document-id.value-object';

import type { DisabilityRetirementPlanningPeriodDisabilityEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/disability-retirement-planning-period-disability.entity';
import type { DisabilityRetirementPlanningPeriodDisabilityDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability-document/disability-retirement-planning-period-disability-document.entity.props.interface';

export class DisabilityRetirementPlanningPeriodDisabilityDocumentEntity extends BaseEntity<DisabilityRetirementPlanningPeriodDisabilityDocumentId> {
  protected readonly _type =
    DisabilityRetirementPlanningPeriodDisabilityDocumentEntity.name;

  public readonly disabilityRetirementPlanningPeriodDisability: DisabilityRetirementPlanningPeriodDisabilityEntity;
  public readonly document: string;

  public constructor(
    props: DisabilityRetirementPlanningPeriodDisabilityDocumentEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningPeriodDisabilityDocumentId, props);
    this.disabilityRetirementPlanningPeriodDisability =
      props.disabilityRetirementPlanningPeriodDisability;
    this.document = props.document;
  }
}
