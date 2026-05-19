import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningRejectionPeriodDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-document/value-object/disability-retirement-planning-rejection-period-document-id/disability-retirement-planning-rejection-period-document-id.value-object';

import type { DisabilityRetirementPlanningRejectionPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/value-object/disability-retirement-planning-rejection-period-id/disability-retirement-planning-rejection-period-id.value-object';
import type { DisabilityRetirementPlanningRejectionPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-document/disability-retirement-planning-rejection-period-document.entity.props.interface';

export class DisabilityRetirementPlanningRejectionPeriodDocumentEntity extends BaseEntity<DisabilityRetirementPlanningRejectionPeriodDocumentId> {
  public readonly document: string;
  public readonly disabilityRetirementPlanningRejectionPeriodId: DisabilityRetirementPlanningRejectionPeriodId;

  protected readonly _type =
    DisabilityRetirementPlanningRejectionPeriodDocumentEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningRejectionPeriodDocumentEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningRejectionPeriodDocumentId, props);
    this.document = props.document;
    this.disabilityRetirementPlanningRejectionPeriodId =
      props.disabilityRetirementPlanningRejectionPeriodId;
  }
}
