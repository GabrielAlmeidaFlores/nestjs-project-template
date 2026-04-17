import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import type { BpcElderlyAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-inss-benefit/value-object/bpc-elderly-analysis-inss-benefit-id/bpc-elderly-analysis-inss-benefit-id.value-object';

export interface BpcElderlyAnalysisInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<BpcElderlyAnalysisInssBenefitId> {
  inssBenefitNumber: string;
  bpcElderlyAnalysisId: BpcElderlyAnalysisId;
}
