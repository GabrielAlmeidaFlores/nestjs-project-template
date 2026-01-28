import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelineAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/enum/rural-timeline-analysis-period-document-type.enum';
import { RuralTimelineAnalysisPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/rural-timeline-analysis-period-document.entity.props.interface';
import { RuralTimelineAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/value-object/rural-timeline-analysis-period-document-id/rural-timeline-analysis-period-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';

export class RuralTimelineAnalysisPeriodDocumentEntity extends BaseEntity<RuralTimelineAnalysisPeriodDocumentId> {
  @Description(
    'Ano de emissão ou referência do documento comprobatório (ex: 2015, 2020).',
  )
  public readonly documentYear: number | null;

  @Description(
    'Identificação do tipo de detentor do documento (próprio cliente, familiar ou terceiro).',
  )
  public readonly documentHolderType: string | null;

  @Description(
    'Indica se o documento pertence ao próprio cliente (true) ou a outra pessoa (false).',
  )
  public readonly selfOwned: boolean | null;

  @Description(
    'Finalidade probatória do documento, descrevendo o que ele comprova sobre a atividade rural.',
  )
  public readonly probatoryPurpose: string | null;

  @Description(
    'Nome do arquivo do documento comprobatório enviado (CTPS, ITR, Declaração Sindicato, etc).',
  )
  public readonly document: string;

  @Description(
    'Tipo/categoria do documento: CTPS, Documento Próprio, Documento Familiar ou Documento de Terceiro.',
  )
  public readonly type: RuralTimelineAnalysisPeriodDocumentTypeEnum;

  @Description(
    'Período de atividade rural ao qual este documento comprobatório pertence.',
  )
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
