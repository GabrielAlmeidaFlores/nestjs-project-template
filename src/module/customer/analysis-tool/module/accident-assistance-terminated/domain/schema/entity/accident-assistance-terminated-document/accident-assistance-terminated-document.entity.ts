import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { Description } from '@shared/system/decorator/property/description/description.decorator';
import { AccidentAssistanceTerminatedDocumentId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/value-object/accident-assistance-terminated-document-id/accident-assistance-terminated-document-id.value-object';
import { AccidentAssistanceTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/enum/accident-assistance-terminated-document-type.enum';

import type { AccidentAssistanceTerminatedDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/accident-assistance-terminated-document.entity.props.interface';

export class AccidentAssistanceTerminatedDocumentEntity extends BaseEntity<AccidentAssistanceTerminatedDocumentId> {
  @Description('Nome do arquivo do documento.')
  public readonly document: string;

  @Description('Tipo do documento.')
  public readonly type: AccidentAssistanceTerminatedDocumentTypeEnum;

  protected readonly _type = AccidentAssistanceTerminatedDocumentEntity.name;

  public constructor(
    props: AccidentAssistanceTerminatedDocumentEntityPropsInterface,
  ) {
    super(AccidentAssistanceTerminatedDocumentId, props);

    this.document = props.document;
    this.type = props.type;
  }
}
