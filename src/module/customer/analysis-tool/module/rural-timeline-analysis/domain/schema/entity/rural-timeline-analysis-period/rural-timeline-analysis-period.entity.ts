import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { ProductionDestinationEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/production-destination.enum';
import { RuralTimelineAnalysisPeriodWorkRegimeTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/rural-timeline-analysis-period-work-regime-type.enum';
import { RuralTimelineAnalysisPeriodWorkerTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/rural-timeline-analysis-period-worker-type.enum';
import { RuralTimelineAnalysisPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/rural-timeline-analysis-period.entity.props.interface';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import type { RuralTimelineAnalysisPeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/value-object/rural-timeline-analysis-period-property-id/rural-timeline-analysis-period-property-id.value-object';
import type { RuralTimelineAnalysisPeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/value-object/rural-timeline-analysis-period-residence-id/rural-timeline-analysis-period-residence-id.value-object';

export class RuralTimelineAnalysisPeriodEntity extends BaseEntity<RuralTimelineAnalysisPeriodId> {
  @Description('Data de início do período.')
  public readonly startDate: Date;

  @Description('Data de término do período.')
  public readonly endDate: Date;

  @Description('Tipo de trabalhador.')
  public readonly workerType: RuralTimelineAnalysisPeriodWorkerTypeEnum;

  @Description('Tipo de regime de trabalho.')
  public readonly workRegimeType: RuralTimelineAnalysisPeriodWorkRegimeTypeEnum;

  @Description('Destino da produção.')
  public readonly productionDestination: ProductionDestinationEnum | null;

  @Description('Análise de documentos do período.')
  public readonly documentAnalysis: string | null;

  @Description('ID da linha do tempo rural associada.')
  public readonly ruralTimelineId: RuralTimelineAnalysisId;

  @Description('ID da propriedade do período.')
  public readonly ruralTimelinePeriodPropertyId: RuralTimelineAnalysisPeriodPropertyId | null;

  @Description('ID da residência do período.')
  public readonly ruralTimelinePeriodResidenceId: RuralTimelineAnalysisPeriodResidenceId | null;

  protected readonly _type = RuralTimelineAnalysisPeriodEntity.name;

  public constructor(props: RuralTimelineAnalysisPeriodEntityPropsInterface) {
    super(RuralTimelineAnalysisPeriodId, props);

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
