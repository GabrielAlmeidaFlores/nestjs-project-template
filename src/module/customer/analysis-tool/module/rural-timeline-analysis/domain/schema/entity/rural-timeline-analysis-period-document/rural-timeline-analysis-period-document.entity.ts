import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelineAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/enum/rural-timeline-analysis-period-document-type.enum';
import { RuralTimelineAnalysisPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/rural-timeline-analysis-period-document.entity.props.interface';
import { RuralTimelineAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/value-object/rural-timeline-analysis-period-document-id/rural-timeline-analysis-period-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';

export class RuralTimelineAnalysisPeriodDocumentEntity extends BaseEntity<RuralTimelineAnalysisPeriodDocumentId> {
  @Description('Ano do documento.')
  public readonly documentYear: number | null;

  @Description('Tipo do detentor do documento.')
  public readonly documentHolderType: string | null;

  @Description('Documento é de propriedade própria.')
  public readonly selfOwned: boolean | null;

  @Description('Propósito probatório do documento.')
  public readonly probatoryPurpose: string | null;

  @Description('Documento.')
  public readonly document: string;

  @Description('Tipo de documento.')
  public readonly type: RuralTimelineAnalysisPeriodDocumentTypeEnum;

  @Description('ID do período da linha do tempo rural associado.')
  public readonly ruralTimelinePeriodId: RuralTimelineAnalysisPeriodId;

  protected readonly _type = RuralTimelineAnalysisPeriodDocumentEntity.name;

  public constructor(
    props: RuralTimelineAnalysisPeriodDocumentEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisPeriodDocumentId, props);

    this.documentYear = props.documentYear ?? null;
    this.documentHolderType = props.documentHolderType ?? null;
    this.selfOwned = props.selfOwned ?? null;
    this.probatoryPurpose = props.probatoryPurpose ?? null;
    this.document = props.document;
    this.type = props.type;
    this.ruralTimelinePeriodId = props.ruralTimelinePeriodId;
  }
}
