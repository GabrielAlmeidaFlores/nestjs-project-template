import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AccidentAssistanceTerminatedBenefitId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-benefit/value-object/accident-assistance-terminated-benefit-id/accident-assistance-terminated-benefit-id.value-object';

export interface AccidentAssistanceTerminatedBenefitEntityPropsInterface
  extends BaseEntityPropsInterface<AccidentAssistanceTerminatedBenefitId> {
  inssBenefitNumber: string;
  dib?: Date | null;
  dcb?: Date | null;
}
