import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AccidentAssistanceTerminatedPeriodId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/value-object/accident-assistance-terminated-period-id/accident-assistance-terminated-period-id.value-object';
import type { AccidentAssistanceTerminatedPeriodDocumentId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period-document/value-object/accident-assistance-terminated-period-document-id/accident-assistance-terminated-period-document-id.value-object';

export interface AccidentAssistanceTerminatedPeriodDocumentEntityPropsInterface
  extends BaseEntityPropsInterface<AccidentAssistanceTerminatedPeriodDocumentId> {
  document?: string | null;
  accidentAssistanceTerminatedPeriodId?: AccidentAssistanceTerminatedPeriodId | null;
}
