import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/enum/death-benefit-rejection-category.enum';
import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DeathBenefitRejectionResultId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/value-object/death-benefit-rejection-result-id.value-object';

export interface DeathBenefitRejectionEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitRejectionId> {
  analysisName?: string | null;
  category?: DeathBenefitRejectionCategoryEnum | null;
  deathBenefitRejectionResultId?: DeathBenefitRejectionResultId | null;
}
