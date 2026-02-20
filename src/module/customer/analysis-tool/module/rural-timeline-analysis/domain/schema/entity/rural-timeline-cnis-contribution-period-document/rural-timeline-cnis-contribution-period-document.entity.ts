import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelineCnisContributionPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-document/rural-timeline-cnis-contribution-period-document.entity.props.interface';
import { RuralTimelineCnisContributionPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-document/value-object/rural-timeline-cnis-contribution-period-document-id/rural-timeline-cnis-contribution-period-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';

export class RuralTimelineCnisContributionPeriodDocumentEntity extends BaseEntity<RuralTimelineCnisContributionPeriodDocumentId> {
  @Description(
    'Tipo/categoria do documento anexado (ex: Comprovante de Residência, Declaração INSS, Certidão de Casamento).',
  )
  public readonly type: string;

  @Description(
    'Nome do arquivo do documento comprobatório enviado para o período CNIS.',
  )
  public readonly document: string;

  @Description(
    'Período de contribuição CNIS ao qual este documento comprobatório pertence.',
  )
  public readonly ruralTimelineCnisContributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId;

  protected readonly _type =
    RuralTimelineCnisContributionPeriodDocumentEntity.name;

  public constructor(
    props: RuralTimelineCnisContributionPeriodDocumentEntityPropsInterface,
  ) {
    super(RuralTimelineCnisContributionPeriodDocumentId, props);

    this.type = props.type;
    this.document = props.document;
    this.ruralTimelineCnisContributionPeriodId =
      props.ruralTimelineCnisContributionPeriodId;
  }
}
