import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import type { AccidentAssistanceGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/enum/accident-assistance-grant-document-type.enum';
import type { AccidentAssistanceGrantDocumentId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/value-object/accident-assistance-grant-document-id.value-object';

export interface AccidentAssistanceGrantDocumentEntityPropsInterface extends BaseEntityPropsInterface<AccidentAssistanceGrantDocumentId> {
  document?: string | null;
  type?: AccidentAssistanceGrantDocumentTypeEnum | null;
  accidentAssistanceGrantId?: AccidentAssistanceGrantId | null;
}
