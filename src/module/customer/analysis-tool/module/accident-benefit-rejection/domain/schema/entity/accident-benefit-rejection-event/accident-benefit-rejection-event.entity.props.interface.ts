import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import type { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import type { AccidentBenefitRejectionEventId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event/value-object/accident-benefit-rejection-event-id.value-object';

export interface AccidentBenefitRejectionEventEntityPropsInterface extends BaseEntityPropsInterface<AccidentBenefitRejectionEventId> {
  accidentDate?: Date | null;
  accidentDescription?: string | null;
  cidTenId?: CidTenId | null;
  accidentBenefitRejectionId?: AccidentBenefitRejectionId | null;
}
