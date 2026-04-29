import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryIncapacityBenefitTerminationDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/value-object/temporary-incapacity-benefit-termination-disability-analysis-id.value-object';
import type { TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-cid/value-object/temporary-incapacity-benefit-termination-disability-analysis-cid-id.value-object';

export interface TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidId> {
  cidTenId: string;
  temporaryIncapacityBenefitTerminationDisabilityAnalysisId: TemporaryIncapacityBenefitTerminationDisabilityAnalysisId;
}
