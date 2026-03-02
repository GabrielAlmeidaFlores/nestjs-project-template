import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import { DisabilityRetirementPlanningDocumentId } from './value-object/disability-retirement-planning-document-id.value-object';

import type { DisabilityRetirementPlanningDocumentEntityPropsInterface } from './disability-retirement-planning-document.entity.props.interface';
import type { DisabilityRetirementPlanningDocumentTypeEnum } from './enum/disability-retirement-planning-document-type.enum';
import type { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';

export class DisabilityRetirementPlanningDocumentEntity extends BaseEntity<DisabilityRetirementPlanningDocumentId> {
  protected readonly _type = DisabilityRetirementPlanningDocumentEntity.name;

  public readonly disabilityRetirementPlanning: DisabilityRetirementPlanningEntity;
  public readonly document: string;
  public readonly type: DisabilityRetirementPlanningDocumentTypeEnum;

  public constructor(
    props: DisabilityRetirementPlanningDocumentEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningDocumentId, props);
    this.disabilityRetirementPlanning = props.disabilityRetirementPlanning;
    this.document = props.document;
    this.type = props.type;
  }
}
