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
  @Description(
    'Data de início do período de atividade rural (formato: DD/MM/AAAA).',
  )
  public readonly startDate: Date | null;

  @Description(
    'Data de término do período de atividade rural (formato: DD/MM/AAAA).',
  )
  public readonly endDate: Date | null;

  @Description(
    'Tipo de trabalhador rural: Segurado Especial Rural, Pescador Artesanal, Seringueiro/Extrativista ou Empregado Rural.',
  )
  public readonly workerType: RuralTimelineAnalysisPeriodWorkerTypeEnum | null;

  @Description(
    'Regime de trabalho rural: Individual (trabalho próprio) ou Economia Familiar (trabalho em grupo familiar).',
  )
  public readonly workRegimeType: RuralTimelineAnalysisPeriodWorkRegimeTypeEnum | null;

  @Description(
    'Destino da produção rural: Subsistência (consumo próprio), Comercialização (venda) ou Ambos.',
  )
  public readonly productionDestination: ProductionDestinationEnum | null;

  @Description(
    'Análise gerada pela IA sobre os documentos comprobatórios apresentados para este período específico.',
  )
  public readonly documentAnalysis: string | null;

  @Description('Linha do tempo rural à qual este período pertence.')
  public readonly ruralTimelineId: RuralTimelineAnalysisId | null;

  @Description(
    'Propriedade rural onde a atividade foi exercida (endereço completo, nome do proprietário, tipo de posse).',
  )
  public readonly ruralTimelinePeriodPropertyId: RuralTimelineAnalysisPeriodPropertyId | null;

  @Description(
    'Residência do cliente durante este período (cidade, UF, distância da propriedade rural).',
  )
  public readonly ruralTimelinePeriodResidenceId: RuralTimelineAnalysisPeriodResidenceId | null;

  protected readonly _type = RuralTimelineAnalysisPeriodEntity.name;

  public constructor(props: RuralTimelineAnalysisPeriodEntityPropsInterface) {
    super(RuralTimelineAnalysisPeriodId, props);

    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.workerType = props.workerType ?? null;
    this.workRegimeType = props.workRegimeType ?? null;
    this.productionDestination = props.productionDestination ?? null;
    this.documentAnalysis = props.documentAnalysis ?? null;
    this.ruralTimelineId = props.ruralTimelineId ?? null;
    this.ruralTimelinePeriodPropertyId =
      props.ruralTimelinePeriodPropertyId ?? null;
    this.ruralTimelinePeriodResidenceId =
      props.ruralTimelinePeriodResidenceId ?? null;
  }
}
