import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-document/value-object/disability-retirement-planning-grant-period-document-id.value-object';

import type { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';
import type { DisabilityRetirementPlanningGrantPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-document/disability-retirement-planning-grant-period-document.entity.props.interface';

export class DisabilityRetirementPlanningGrantPeriodDocumentEntity extends BaseEntity<DisabilityRetirementPlanningGrantPeriodDocumentId> {
  public readonly document: string;
  public readonly disabilityRetirementPlanningGrantPeriodId: DisabilityRetirementPlanningGrantPeriodId;

  protected readonly _type =
    DisabilityRetirementPlanningGrantPeriodDocumentEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningGrantPeriodDocumentEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningGrantPeriodDocumentId, props);
    this.document = props.document;
    this.disabilityRetirementPlanningGrantPeriodId =
      props.disabilityRetirementPlanningGrantPeriodId;
  }
}
