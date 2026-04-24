import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AccidentAssistanceTerminatedCidId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-cid/value-object/accident-assistance-terminated-cid-id/accident-assistance-terminated-cid-id.value-object';

export interface AccidentAssistanceTerminatedCidEntityPropsInterface
  extends BaseEntityPropsInterface<AccidentAssistanceTerminatedCidId> {
  name: string;
}
