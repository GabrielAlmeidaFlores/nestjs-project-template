import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AccidentAssistanceTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/enum/accident-assistance-terminated-document-type.enum';
import type { AccidentAssistanceTerminatedDocumentId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/value-object/accident-assistance-terminated-document-id/accident-assistance-terminated-document-id.value-object';

export interface AccidentAssistanceTerminatedDocumentEntityPropsInterface extends BaseEntityPropsInterface<AccidentAssistanceTerminatedDocumentId> {
  document: string;
  type: AccidentAssistanceTerminatedDocumentTypeEnum;
}
