import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import type { AccidentBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/enum/accident-benefit-rejection-document-type.enum';
import type { AccidentBenefitRejectionDocumentId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/value-object/accident-benefit-rejection-document-id.value-object';

export interface AccidentBenefitRejectionDocumentEntityPropsInterface extends BaseEntityPropsInterface<AccidentBenefitRejectionDocumentId> {
  document?: string | null;
  type?: AccidentBenefitRejectionDocumentTypeEnum | null;
  accidentBenefitRejectionId?: AccidentBenefitRejectionId | null;
}
