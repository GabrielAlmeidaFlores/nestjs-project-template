import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRgpsPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period-document/retirement-planning-rgps-period-document.entity.props.interface';
import { RetirementPlanningRgpsPeriodDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period-document/value-object/retirement-planning-rgps-period-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';

export class RetirementPlanningRgpsPeriodDocumentEntity extends BaseEntity<RetirementPlanningRgpsPeriodDocumentId> {
  @Description(
    'Conteúdo do documento associado ao período de planejamento RGPS.',
  )
  public readonly document: string;

  @Description('Período do planejamento RGPS relacionado ao documento.')
  public readonly retirementPlanningRgpsPeriod?: RetirementPlanningRgpsPeriodEntity | null;

  protected readonly _type = RetirementPlanningRgpsPeriodDocumentEntity.name;

  public constructor(
    props: RetirementPlanningRgpsPeriodDocumentEntityPropsInterface,
  ) {
    super(RetirementPlanningRgpsPeriodDocumentId, props);

    this.document = props.document;
    this.retirementPlanningRgpsPeriod =
      props.retirementPlanningRgpsPeriod ?? null;
  }
}
