import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AccidentAssistanceGrantResultId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-result/value-object/accident-assistance-grant-result-id.value-object';

export interface AccidentAssistanceGrantResultEntityPropsInterface extends BaseEntityPropsInterface<AccidentAssistanceGrantResultId> {
  firstAnalysis?: string | null;
  simplifiedAnalysis?: string | null;
  completeAnalysis?: string | null;
}
