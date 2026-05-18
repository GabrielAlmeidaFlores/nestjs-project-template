import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/value-object/temporary-incapacity-benefit-rejection-disability-analysis-id.value-object';
import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-cid/value-object/temporary-incapacity-benefit-rejection-disability-analysis-cid-id.value-object';

export interface TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidId> {
  cidTenId: string;
  temporaryIncapacityBenefitRejectionDisabilityAnalysisId: TemporaryIncapacityBenefitRejectionDisabilityAnalysisId;
}
