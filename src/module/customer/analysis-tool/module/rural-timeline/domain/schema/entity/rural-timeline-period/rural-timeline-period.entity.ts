import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { ProductionDestinationEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/enum/production-destination.enum';
import { RuralTimelinePeriodWorkRegimeTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/enum/rural-timeline-period-work-regime-type.enum';
import { RuralTimelinePeriodWorkerTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/enum/rural-timeline-period-worker-type.enum';
import { RuralTimelinePeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/rural-timeline-period.entity.props.interface';
import { RuralTimelinePeriodId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/value-object/rural-timeline-period-id/rural-timeline-period-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/value-object/rural-timeline-id/rural-timeline-id.value-object';
import type { RuralTimelinePeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-property/value-object/rural-timeline-period-property-id/rural-timeline-period-property-id.value-object';
import type { RuralTimelinePeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-residence/value-object/rural-timeline-period-residence-id/rural-timeline-period-residence-id.value-object';

export class RuralTimelinePeriodEntity extends BaseEntity<RuralTimelinePeriodId> {
  @Description('Data de início do período.')
  public readonly startDate: Date;

  @Description('Data de término do período.')
  public readonly endDate: Date;

  @Description('Tipo de trabalhador.')
  public readonly workerType: RuralTimelinePeriodWorkerTypeEnum;

  @Description('Tipo de regime de trabalho.')
  public readonly workRegimeType: RuralTimelinePeriodWorkRegimeTypeEnum;

  @Description('Destino da produção.')
  public readonly productionDestination: ProductionDestinationEnum | null;

  @Description('Análise de documentos do período.')
  public readonly documentAnalysis: string | null;

  @Description('ID da linha do tempo rural associada.')
  public readonly ruralTimelineId: RuralTimelineId;

  @Description('ID da propriedade do período.')
  public readonly ruralTimelinePeriodPropertyId: RuralTimelinePeriodPropertyId | null;

  @Description('ID da residência do período.')
  public readonly ruralTimelinePeriodResidenceId: RuralTimelinePeriodResidenceId | null;

  protected readonly _type = RuralTimelinePeriodEntity.name;

  public constructor(props: RuralTimelinePeriodEntityPropsInterface) {
    super(RuralTimelinePeriodId, props);

    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.workerType = props.workerType;
    this.workRegimeType = props.workRegimeType;
    this.productionDestination = props.productionDestination ?? null;
    this.documentAnalysis = props.documentAnalysis ?? null;
    this.ruralTimelineId = props.ruralTimelineId;
    this.ruralTimelinePeriodPropertyId =
      props.ruralTimelinePeriodPropertyId ?? null;
    this.ruralTimelinePeriodResidenceId =
      props.ruralTimelinePeriodResidenceId ?? null;
  }
}
