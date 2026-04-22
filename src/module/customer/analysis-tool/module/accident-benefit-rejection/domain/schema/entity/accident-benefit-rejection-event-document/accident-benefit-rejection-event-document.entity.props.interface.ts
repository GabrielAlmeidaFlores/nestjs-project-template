import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AccidentBenefitRejectionEventId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event/value-object/accident-benefit-rejection-event-id.value-object';
import type { AccidentBenefitRejectionEventDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event-document/enum/accident-benefit-rejection-event-document-type.enum';
import type { AccidentBenefitRejectionEventDocumentId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event-document/value-object/accident-benefit-rejection-event-document-id.value-object';

export interface AccidentBenefitRejectionEventDocumentEntityPropsInterface extends BaseEntityPropsInterface<AccidentBenefitRejectionEventDocumentId> {
  document?: string | null;
  type?: AccidentBenefitRejectionEventDocumentTypeEnum | null;
  accidentBenefitRejectionEventId?: AccidentBenefitRejectionEventId | null;
}
