import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { RuralTimelineAnalysisWorkRegimeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/enum/rural-timeline-work-regime.enum';
import { RuralTimelineAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity.props.interface';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RuralTimelineAnalysisEntity extends BaseEntity<RuralTimelineAnalysisId> {
  @Description(
    'Análise completa gerada pela IA sobre a linha do tempo rural do cliente, incluindo avaliação detalhada dos períodos de atividade rural e urbana.',
  )
  public readonly ruralTimelineCompleteAnalysis: string | null;

  @Description(
    'Análise simplificada gerada pela IA sobre a linha do tempo rural do cliente, com resumo objetivo dos períodos de atividade.',
  )
  public readonly ruralTimelineSimplifiedAnalysis: string | null;

  @Description(
    'Análise detalhada dos documentos comprobatórios apresentados para cada período da linha do tempo rural.',
  )
  public readonly ruralTimelinePeriodDocumentAnalysis: string | null;

  @Description(
    'ID do cliente da ferramenta de análise previdenciária (dados pessoais, CPF, benefícios, processos).',
  )
  public readonly analysisToolClientId: AnalysisToolClientId;

  @Description(
    'Regime de trabalho identificado: se o cliente trabalhou somente em atividades rurais ou de forma híbrida (rural e urbana).',
  )
  public readonly workRegime: RuralTimelineAnalysisWorkRegimeEnum;

  protected readonly _type = RuralTimelineAnalysisEntity.name;

  public constructor(props: RuralTimelineAnalysisEntityPropsInterface) {
    super(RuralTimelineAnalysisId, props);

    this.ruralTimelineCompleteAnalysis =
      props.ruralTimelineCompleteAnalysis ?? null;
    this.ruralTimelineSimplifiedAnalysis =
      props.ruralTimelineSimplifiedAnalysis ?? null;
    this.ruralTimelinePeriodDocumentAnalysis =
      props.ruralTimelinePeriodDocumentAnalysis ?? null;
    this.analysisToolClientId = props.analysisToolClientId;
    this.workRegime = props.workRegime;
  }
}
