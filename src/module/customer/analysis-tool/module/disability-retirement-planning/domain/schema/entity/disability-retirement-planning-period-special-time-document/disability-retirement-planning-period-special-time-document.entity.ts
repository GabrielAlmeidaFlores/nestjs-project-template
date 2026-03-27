import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time-document/value-object/disability-retirement-planning-period-special-time-document-id.value-object';

import type { DisabilityRetirementPlanningPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time/disability-retirement-planning-period-special-time.entity';
import type { DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time-document/disability-retirement-planning-period-special-time-document.entity.props.interface';
import type { DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time-document/enum/disability-retirement-planning-period-special-time-document-type.enum';

export class DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntity extends BaseEntity<DisabilityRetirementPlanningPeriodSpecialTimeDocumentId> {
  public readonly disabilityRetirementPlanningPeriodSpecialTime: DisabilityRetirementPlanningPeriodSpecialTimeEntity;
  public readonly document: string;
  public readonly type: DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeEnum;

  protected readonly _type =
    DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningPeriodSpecialTimeDocumentId, props);
    this.disabilityRetirementPlanningPeriodSpecialTime =
      props.disabilityRetirementPlanningPeriodSpecialTime;
    this.document = props.document;
    this.type = props.type;
  }
}
