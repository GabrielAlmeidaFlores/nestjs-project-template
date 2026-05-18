import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PermanentIncapacityBenefitTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-category.enum';
import type { PermanentIncapacityBenefitTerminatedReasonEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-reason.enum';
import type { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import type { PermanentIncapacityBenefitTerminatedResultId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-result/value-object/permanent-incapacity-benefit-terminated-result-id.value-object';

export interface PermanentIncapacityBenefitTerminatedEntityPropsInterface extends BaseEntityPropsInterface<PermanentIncapacityBenefitTerminatedId> {
  analysisName?: string | null;
  benefitTerminationDate?: Date | null;
  category?: PermanentIncapacityBenefitTerminatedCategoryEnum | null;
  terminationReason?: PermanentIncapacityBenefitTerminatedReasonEnum | null;
  terminationReasonDescription?: string | null;
  permanentIncapacityBenefitTerminatedResultId?: PermanentIncapacityBenefitTerminatedResultId | null;
}
