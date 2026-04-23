import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningRejectionDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/value-object/disability-retirement-planning-rejection-document-id/disability-retirement-planning-rejection-document-id.value-object';

import type { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import type { DisabilityRetirementPlanningRejectionDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/disability-retirement-planning-rejection-document.entity.props.interface';
import type { DisabilityRetirementPlanningRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/enum/disability-retirement-planning-rejection-document-type.enum';

export class DisabilityRetirementPlanningRejectionDocumentEntity extends BaseEntity<DisabilityRetirementPlanningRejectionDocumentId> {
  public readonly document: string;
  public readonly type: DisabilityRetirementPlanningRejectionDocumentTypeEnum;
  public readonly disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId;

  protected readonly _type =
    DisabilityRetirementPlanningRejectionDocumentEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningRejectionDocumentEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningRejectionDocumentId, props);
    this.document = props.document;
    this.type = props.type;
    this.disabilityRetirementPlanningRejectionId =
      props.disabilityRetirementPlanningRejectionId;
  }
}
