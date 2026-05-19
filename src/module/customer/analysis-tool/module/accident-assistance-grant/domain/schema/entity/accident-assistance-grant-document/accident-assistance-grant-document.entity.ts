import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AccidentAssistanceGrantDocumentId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/value-object/accident-assistance-grant-document-id.value-object';

import type { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import type { AccidentAssistanceGrantDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/accident-assistance-grant-document.entity.props.interface';
import type { AccidentAssistanceGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/enum/accident-assistance-grant-document-type.enum';

export class AccidentAssistanceGrantDocumentEntity extends BaseEntity<AccidentAssistanceGrantDocumentId> {
  public readonly document: string | null;
  public readonly type: AccidentAssistanceGrantDocumentTypeEnum | null;
  public readonly accidentAssistanceGrantId: AccidentAssistanceGrantId | null;

  protected readonly _type = AccidentAssistanceGrantDocumentEntity.name;

  public constructor(
    props: AccidentAssistanceGrantDocumentEntityPropsInterface,
  ) {
    super(AccidentAssistanceGrantDocumentId, props);
    this.document = props.document ?? null;
    this.type = props.type ?? null;
    this.accidentAssistanceGrantId = props.accidentAssistanceGrantId ?? null;
  }
}
