import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelineDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-document/enum/rural-timeline-document-type.enum';
import { RuralTimelineDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-document/rural-timeline-document.entity.props.interface';
import { RuralTimelineDocumentId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-document/value-object/rural-timeline-document-id/rural-timeline-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RuralTimelineId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/value-object/rural-timeline-id/rural-timeline-id.value-object';

export class RuralTimelineDocumentEntity extends BaseEntity<RuralTimelineDocumentId> {
  @Description('Tipo do documento.')
  public readonly type: RuralTimelineDocumentTypeEnum;

  @Description('Documento.')
  public readonly document: string;

  @Description('ID da linha do tempo rural associada.')
  public readonly ruralTimelineId: RuralTimelineId;

  protected readonly _type = RuralTimelineDocumentEntity.name;

  public constructor(props: RuralTimelineDocumentEntityPropsInterface) {
    super(RuralTimelineDocumentId, props);

    this.type = props.type;
    this.document = props.document;
    this.ruralTimelineId = props.ruralTimelineId;
  }
}
