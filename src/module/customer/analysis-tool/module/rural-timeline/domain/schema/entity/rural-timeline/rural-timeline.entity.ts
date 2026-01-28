import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { RuralTimelineWorkRegimeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/enum/rural-timeline-work-regime.enum';
import { RuralTimelineEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/rural-timeline.entity.props.interface';
import { RuralTimelineId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/value-object/rural-timeline-id/rural-timeline-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RuralTimelineEntity extends BaseEntity<RuralTimelineId> {
  @Description('Análise da linha do tempo rural.')
  public readonly ruralTimelineAnalysis: string | null;

  @Description('Análise dos documentos do período da linha do tempo rural.')
  public readonly ruralTimelinePeriodDocumentAnalysis: string | null;

  @Description('ID do cliente da ferramenta de análise.')
  public readonly analysisToolClientId: AnalysisToolClientId;

  @Description('Regime de trabalho.')
  public readonly workRegime: RuralTimelineWorkRegimeEnum;

  protected readonly _type = RuralTimelineEntity.name;

  public constructor(props: RuralTimelineEntityPropsInterface) {
    super(RuralTimelineId, props);

    this.ruralTimelineAnalysis = props.ruralTimelineAnalysis ?? null;
    this.ruralTimelinePeriodDocumentAnalysis =
      props.ruralTimelinePeriodDocumentAnalysis ?? null;
    this.analysisToolClientId = props.analysisToolClientId;
    this.workRegime = props.workRegime;
  }
}
