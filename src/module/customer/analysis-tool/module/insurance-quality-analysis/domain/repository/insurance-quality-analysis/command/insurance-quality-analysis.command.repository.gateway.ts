import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { InsuranceQualityAnalysisEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/insurance-quality-analysis.entity';
import type { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';

export abstract class InsuranceQualityAnalysisCommandRepositoryGateway {
  public abstract createInsuranceQualityAnalysis(
    props: InsuranceQualityAnalysisEntity,
  ): TransactionType;

  public abstract updateInsuranceQualityAnalysis(
    id: InsuranceQualityAnalysisId,
    props: Partial<InsuranceQualityAnalysisEntity>,
  ): TransactionType;

  public abstract deleteInsuranceQualityAnalysis(
    id: InsuranceQualityAnalysisId,
  ): TransactionType;
}
