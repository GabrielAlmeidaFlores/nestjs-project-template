import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelineAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/enum/rural-timeline-analysis-document-type.enum';
import { RuralTimelineAnalysisDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/rural-timeline-analysis-document.entity.props.interface';
import { RuralTimelineAnalysisDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/value-object/rural-timeline-analysis-document-id/rural-timeline-analysis-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';

export class RuralTimelineAnalysisDocumentEntity extends BaseEntity<RuralTimelineAnalysisDocumentId> {
  @Description(
    'Tipo do documento: CNIS (Cadastro Nacional de Informações Sociais) contendo histórico de contribuições previdenciárias.',
  )
  public readonly type: RuralTimelineAnalysisDocumentTypeEnum;

  @Description('Nome do arquivo do documento CNIS enviado para análise.')
  public readonly document: string;

  @Description('Linha do tempo rural à qual este documento CNIS pertence.')
  public readonly ruralTimelineId: RuralTimelineAnalysisId;

  protected readonly _type = RuralTimelineAnalysisDocumentEntity.name;

  public constructor(props: RuralTimelineAnalysisDocumentEntityPropsInterface) {
    super(RuralTimelineAnalysisDocumentId, props);

    this.type = props.type;
    this.document = props.document;
    this.ruralTimelineId = props.ruralTimelineId;
  }
}
