import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import { DisabilityRetirementPlanningPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time/disability-retirement-planning-period-special-time.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time-document/disability-retirement-planning-period-special-time-document.entity.props.interface';
import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time-document/value-object/disability-retirement-planning-period-special-time-document-id.value-object';

export class DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntity extends BaseEntity<DisabilityRetirementPlanningPeriodSpecialTimeDocumentId> {
  protected readonly _type = DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntity.name;

  public readonly disabilityRetirementPlanningPeriodSpecialTime: DisabilityRetirementPlanningPeriodSpecialTimeEntity;
  public readonly document: string;

  public constructor(props: DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntityPropsInterface) {
    super(DisabilityRetirementPlanningPeriodSpecialTimeDocumentId, props);
    this.disabilityRetirementPlanningPeriodSpecialTime = props.disabilityRetirementPlanningPeriodSpecialTime;
    this.document = props.document;
  }
}
