import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/value-object/disability-retirement-planning-document-id.value-object';

import type { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import type { DisabilityRetirementPlanningDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/disability-retirement-planning-document.entity.props.interface';
import type { DisabilityRetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/enum/disability-retirement-planning-document-type.enum';

export class DisabilityRetirementPlanningDocumentEntity extends BaseEntity<DisabilityRetirementPlanningDocumentId> {
  public readonly disabilityRetirementPlanning: DisabilityRetirementPlanningEntity;
  public readonly document: string;
  public readonly type: DisabilityRetirementPlanningDocumentTypeEnum;

  protected readonly _type = DisabilityRetirementPlanningDocumentEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningDocumentEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningDocumentId, props);
    this.disabilityRetirementPlanning = props.disabilityRetirementPlanning;
    this.document = props.document;
    this.type = props.type;
  }
}
