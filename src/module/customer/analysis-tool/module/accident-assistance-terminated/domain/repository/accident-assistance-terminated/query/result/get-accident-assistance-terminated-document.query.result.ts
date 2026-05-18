import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AccidentAssistanceTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/enum/accident-assistance-terminated-document-type.enum';
import type { AccidentAssistanceTerminatedDocumentId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/value-object/accident-assistance-terminated-document-id/accident-assistance-terminated-document-id.value-object';

export class GetAccidentAssistanceTerminatedDocumentQueryResult extends BaseBuildableObject {
  public readonly id: AccidentAssistanceTerminatedDocumentId;
  public readonly document: string;
  public readonly type: AccidentAssistanceTerminatedDocumentTypeEnum;

  protected override readonly _type =
    GetAccidentAssistanceTerminatedDocumentQueryResult.name;
}
