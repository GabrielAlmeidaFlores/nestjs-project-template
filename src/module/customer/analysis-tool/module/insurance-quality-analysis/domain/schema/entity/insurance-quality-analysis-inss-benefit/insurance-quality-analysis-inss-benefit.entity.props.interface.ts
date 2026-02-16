import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { InsuranceQualityAnalysisEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/insurance-quality-analysis.entity';
import type { InsuranceQualityAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-inss-benefit/value-object/insurance-quality-analysis-inss-benefit-id/insurance-quality-analysis-inss-benefit-id.value-object';

export interface InsuranceQualityAnalysisInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<InsuranceQualityAnalysisInssBenefitId> {
  readonly inssBenefitNumber: string;
  readonly insuranceQualityAnalysis: InsuranceQualityAnalysisEntity;
}
