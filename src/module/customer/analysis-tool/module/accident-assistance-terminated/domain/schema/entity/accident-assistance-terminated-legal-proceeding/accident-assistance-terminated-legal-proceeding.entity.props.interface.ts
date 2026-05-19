import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AccidentAssistanceTerminatedLegalProceedingId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-legal-proceeding/value-object/accident-assistance-terminated-legal-proceeding-id/accident-assistance-terminated-legal-proceeding-id.value-object';

export interface AccidentAssistanceTerminatedLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<AccidentAssistanceTerminatedLegalProceedingId> {
  legalProceedingNumber: string;
}
