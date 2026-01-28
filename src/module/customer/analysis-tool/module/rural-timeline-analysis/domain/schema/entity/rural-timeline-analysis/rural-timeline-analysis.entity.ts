import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { RuralTimelineAnalysisWorkRegimeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/enum/rural-timeline-work-regime.enum';
import { RuralTimelineAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity.props.interface';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RuralTimelineAnalysisEntity extends BaseEntity<RuralTimelineAnalysisId> {
  @Description('Análise da linha do tempo rural.')
  public readonly ruralTimelineAnalysis: string | null;

  @Description('Análise dos documentos do período da linha do tempo rural.')
  public readonly ruralTimelinePeriodDocumentAnalysis: string | null;

  @Description('ID do cliente da ferramenta de análise.')
  public readonly analysisToolClientId: AnalysisToolClientId;

  @Description('Regime de trabalho.')
  public readonly workRegime: RuralTimelineAnalysisWorkRegimeEnum;

  protected readonly _type = RuralTimelineAnalysisEntity.name;

  public constructor(props: RuralTimelineAnalysisEntityPropsInterface) {
    super(RuralTimelineAnalysisId, props);

    this.ruralTimelineAnalysis = props.ruralTimelineAnalysis ?? null;
    this.ruralTimelinePeriodDocumentAnalysis =
      props.ruralTimelinePeriodDocumentAnalysis ?? null;
    this.analysisToolClientId = props.analysisToolClientId;
    this.workRegime = props.workRegime;
  }
}
