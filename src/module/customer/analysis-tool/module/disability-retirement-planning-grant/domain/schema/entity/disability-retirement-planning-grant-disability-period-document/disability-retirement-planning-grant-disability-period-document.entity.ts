import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period-document/value-object/disability-retirement-planning-grant-disability-period-document-id.value-object';

import type { DisabilityRetirementPlanningGrantDisabilityPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/value-object/disability-retirement-planning-grant-disability-period-id.value-object';
import type { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period-document/disability-retirement-planning-grant-disability-period-document.entity.props.interface';
import type { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period-document/enum/disability-retirement-planning-grant-disability-period-document-type.enum';

export class DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity extends BaseEntity<DisabilityRetirementPlanningGrantDisabilityPeriodDocumentId> {
  public readonly document: string;
  public readonly type: DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeEnum;
  public readonly disabilityRetirementPlanningGrantDisabilityPeriodId: DisabilityRetirementPlanningGrantDisabilityPeriodId;

  protected readonly _type =
    DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningGrantDisabilityPeriodDocumentId, props);
    this.document = props.document;
    this.type = props.type;
    this.disabilityRetirementPlanningGrantDisabilityPeriodId =
      props.disabilityRetirementPlanningGrantDisabilityPeriodId;
  }
}
