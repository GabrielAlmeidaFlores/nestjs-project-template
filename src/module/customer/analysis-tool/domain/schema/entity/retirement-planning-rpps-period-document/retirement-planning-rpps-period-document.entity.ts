import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRppsPeriodDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/value-object/retirement-planning-rpps-period-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RetirementPlanningRppsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/retirement-plannig-rpps-period.entity';
import type { RetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/enum/retirement-planning-document-type.enum';
import type { RetirementPlanningRppsPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/retirement-planning-rpps-period-document.entity.props.interface';

export class RetirementPlanningRppsPeriodDocumentEntity extends BaseEntity<RetirementPlanningRppsPeriodDocumentId> {
  @Description('Documento do período RPPS')
  public readonly document: string;
  @Description('Tipo do documento do período RPPS')
  public readonly documentType: RetirementPlanningDocumentTypeEnum;
  @Description('Período RPPS associado ao documento')
  public readonly retirementPlanningRppsPeriod: RetirementPlanningRppsPeriodEntity;

  protected readonly _type = RetirementPlanningRppsPeriodDocumentEntity.name;
  public constructor(
    props: RetirementPlanningRppsPeriodDocumentEntityPropsInterface,
  ) {
    super(RetirementPlanningRppsPeriodDocumentId, props);
    this.document = props.document;
    this.documentType = props.documentType;
    this.retirementPlanningRppsPeriod = props.retirementPlanningRppsPeriod;
  }
}
