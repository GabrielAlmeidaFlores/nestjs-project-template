import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AccidentAssistanceTerminatedResultId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-result/value-object/accident-assistance-terminated-result-id/accident-assistance-terminated-result-id.value-object';

export interface AccidentAssistanceTerminatedResultEntityPropsInterface extends BaseEntityPropsInterface<AccidentAssistanceTerminatedResultId> {
  accidentAssistanceTerminatedCompleteAnalysis?: string | null;
  accidentAssistanceTerminatedSimplifiedAnalysis?: string | null;
  decisionDetails?: string | null;
}
