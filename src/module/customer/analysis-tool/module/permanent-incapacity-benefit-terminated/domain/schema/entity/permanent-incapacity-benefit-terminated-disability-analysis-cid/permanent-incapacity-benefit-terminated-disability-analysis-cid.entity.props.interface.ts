import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/value-object/permanent-incapacity-benefit-terminated-disability-analysis-id.value-object';
import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-cid/value-object/permanent-incapacity-benefit-terminated-disability-analysis-cid-id.value-object';

export interface PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntityPropsInterface extends BaseEntityPropsInterface<PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidId> {
  cidTenId: string;
  permanentIncapacityBenefitTerminatedDisabilityAnalysisId: PermanentIncapacityBenefitTerminatedDisabilityAnalysisId;
}
