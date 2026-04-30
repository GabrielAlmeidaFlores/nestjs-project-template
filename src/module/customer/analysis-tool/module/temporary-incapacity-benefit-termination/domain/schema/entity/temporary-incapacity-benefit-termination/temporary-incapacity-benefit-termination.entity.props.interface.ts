import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryIncapacityBenefitTerminationCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/enum/temporary-incapacity-benefit-termination-category.enum';
import type { TemporaryIncapacityBenefitTerminationReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/enum/temporary-incapacity-benefit-termination-reason.enum';
import type { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import type { TemporaryIncapacityBenefitTerminationResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-result/value-object/temporary-incapacity-benefit-termination-result-id.value-object';

export interface TemporaryIncapacityBenefitTerminationEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitTerminationId> {
  analysisName?: string | null;
  benefitTerminationDate?: Date | null;
  category?: TemporaryIncapacityBenefitTerminationCategoryEnum | null;
  terminationReason?: TemporaryIncapacityBenefitTerminationReasonEnum | null;
  terminationReasonDescription?: string | null;
  temporaryIncapacityBenefitTerminationResultId?: TemporaryIncapacityBenefitTerminationResultId | null;
}
