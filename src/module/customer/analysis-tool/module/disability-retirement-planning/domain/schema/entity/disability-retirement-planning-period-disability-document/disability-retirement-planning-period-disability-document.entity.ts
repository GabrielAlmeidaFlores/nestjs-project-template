import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningPeriodDisabilityDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability-document/value-object/disability-retirement-planning-period-disability-document-id.value-object';

import type { DisabilityRetirementPlanningPeriodDisabilityEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/disability-retirement-planning-period-disability.entity';
import type { DisabilityRetirementPlanningPeriodDisabilityDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability-document/disability-retirement-planning-period-disability-document.entity.props.interface';
import type { DisabilityRetirementPlanningPeriodDisabilityDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability-document/enum/disability-retirement-planning-period-disability-document-type.enum';

export class DisabilityRetirementPlanningPeriodDisabilityDocumentEntity extends BaseEntity<DisabilityRetirementPlanningPeriodDisabilityDocumentId> {
  public readonly disabilityRetirementPlanningPeriodDisability: DisabilityRetirementPlanningPeriodDisabilityEntity;
  public readonly document: string;
  public readonly type: DisabilityRetirementPlanningPeriodDisabilityDocumentTypeEnum;

  protected readonly _type =
    DisabilityRetirementPlanningPeriodDisabilityDocumentEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningPeriodDisabilityDocumentEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningPeriodDisabilityDocumentId, props);
    this.disabilityRetirementPlanningPeriodDisability =
      props.disabilityRetirementPlanningPeriodDisability;
    this.document = props.document;
    this.type = props.type;
  }
}
