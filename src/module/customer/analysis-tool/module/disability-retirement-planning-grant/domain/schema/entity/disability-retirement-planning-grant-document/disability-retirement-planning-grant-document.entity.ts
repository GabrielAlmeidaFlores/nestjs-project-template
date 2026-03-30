import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningGrantDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-document/value-object/disability-retirement-planning-grant-document-id.value-object';

import type { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import type { DisabilityRetirementPlanningGrantDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-document/disability-retirement-planning-grant-document.entity.props.interface';
import type { DisabilityRetirementPlanningGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-document/enum/disability-retirement-planning-grant-document-type.enum';

export class DisabilityRetirementPlanningGrantDocumentEntity extends BaseEntity<DisabilityRetirementPlanningGrantDocumentId> {
  public readonly document: string;
  public readonly type: DisabilityRetirementPlanningGrantDocumentTypeEnum;
  public readonly disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId;

  protected readonly _type =
    DisabilityRetirementPlanningGrantDocumentEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningGrantDocumentEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningGrantDocumentId, props);
    this.document = props.document;
    this.type = props.type;
    this.disabilityRetirementPlanningGrantId =
      props.disabilityRetirementPlanningGrantId;
  }
}
