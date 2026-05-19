import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryIncapacityBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-category.enum';
import type { TemporaryIncapacityBenefitRejectionConditionEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-condition.enum';
import type { TemporaryIncapacityBenefitRejectionDenialReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-denial-reason.enum';
import type { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import type { TemporaryIncapacityBenefitRejectionResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-result/value-object/temporary-incapacity-benefit-rejection-result-id.value-object';

export interface TemporaryIncapacityBenefitRejectionEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitRejectionId> {
  analysisName?: string | null;
  requestEntryDate?: Date | null;
  denialDate?: Date | null;
  requestedBenefitType?: string | null;
  category?: TemporaryIncapacityBenefitRejectionCategoryEnum | null;
  denialReason?: TemporaryIncapacityBenefitRejectionDenialReasonEnum | null;
  denialReasonDescription?: string | null;
  condition?: TemporaryIncapacityBenefitRejectionConditionEnum | null;
  conditionDescription?: string | null;
  temporaryIncapacityBenefitRejectionResultId?: TemporaryIncapacityBenefitRejectionResultId | null;
}
