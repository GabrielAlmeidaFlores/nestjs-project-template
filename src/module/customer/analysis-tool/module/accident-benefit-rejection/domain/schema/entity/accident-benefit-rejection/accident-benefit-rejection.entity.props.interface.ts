import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AccidentBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-category.enum';
import type { AccidentBenefitRejectionMainReasonEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-main-reason.enum';
import type { AccidentBenefitRejectionRequestToExtendEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-request-to-extend.enum';
import type { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import type { AccidentBenefitRejectionResultId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-result/value-object/accident-benefit-rejection-result-id.value-object';

export interface AccidentBenefitRejectionEntityPropsInterface extends BaseEntityPropsInterface<AccidentBenefitRejectionId> {
  analysisName?: string | null;
  requirementStartDate?: Date | null;
  rejectionDate?: Date | null;
  category?: AccidentBenefitRejectionCategoryEnum | null;
  mainAccidentBenefitRejectionReason?: AccidentBenefitRejectionMainReasonEnum | null;
  otherAccidentBenefitRejectionReason?: string | null;
  hasPreviousGrantRelated?: boolean | null;
  previousGrantBenefitNumber?: string | null;
  previousGrantStartDate?: Date | null;
  previousGrantTerminationDate?: Date | null;
  requestToExtendTemporaryDisabilityBenefit?: AccidentBenefitRejectionRequestToExtendEnum | null;
  accidentBenefitRejectionResultId?: AccidentBenefitRejectionResultId | null;
}
