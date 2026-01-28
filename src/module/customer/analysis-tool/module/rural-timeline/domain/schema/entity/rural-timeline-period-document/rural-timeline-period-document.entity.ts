import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelinePeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-document/enum/rural-timeline-period-document-type.enum';
import { RuralTimelinePeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-document/rural-timeline-period-document.entity.props.interface';
import { RuralTimelinePeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-document/value-object/rural-timeline-period-document-id/rural-timeline-period-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelinePeriodId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/value-object/rural-timeline-period-id/rural-timeline-period-id.value-object';

export class RuralTimelinePeriodDocumentEntity extends BaseEntity<RuralTimelinePeriodDocumentId> {
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
  public readonly type: RuralTimelinePeriodDocumentTypeEnum;

  @Description('ID do período da linha do tempo rural associado.')
  public readonly ruralTimelinePeriodId: RuralTimelinePeriodId;

  protected readonly _type = RuralTimelinePeriodDocumentEntity.name;

  public constructor(props: RuralTimelinePeriodDocumentEntityPropsInterface) {
    super(RuralTimelinePeriodDocumentId, props);

    this.documentYear = props.documentYear ?? null;
    this.documentHolderType = props.documentHolderType ?? null;
    this.selfOwned = props.selfOwned ?? null;
    this.probatoryPurpose = props.probatoryPurpose ?? null;
    this.document = props.document;
    this.type = props.type;
    this.ruralTimelinePeriodId = props.ruralTimelinePeriodId;
  }
}
