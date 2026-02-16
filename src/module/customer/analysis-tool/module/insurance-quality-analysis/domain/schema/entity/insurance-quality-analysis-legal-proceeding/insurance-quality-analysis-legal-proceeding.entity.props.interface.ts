import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { InsuranceQualityAnalysisEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/insurance-quality-analysis.entity';
import type { InsuranceQualityAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-legal-proceeding/value-object/insurance-quality-analysis-legal-proceeding-id/insurance-quality-analysis-legal-proceeding-id.value-object';

export interface InsuranceQualityAnalysisLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<InsuranceQualityAnalysisLegalProceedingId> {
  readonly legalProceedingNumber: string;
  readonly insuranceQualityAnalysis: InsuranceQualityAnalysisEntity;
}
