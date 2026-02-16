import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { InsuranceQualityAnalysisResultEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-result/insurance-quality-analysis-result.entity';
import type { InsuranceQualityAnalysisResultId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-result/value-object/insurance-quality-analysis-result-id/insurance-quality-analysis-result-id.value-object';

export abstract class InsuranceQualityAnalysisResultCommandRepositoryGateway {
  public abstract createInsuranceQualityAnalysisResult(
    props: InsuranceQualityAnalysisResultEntity,
  ): TransactionType;

  public abstract updateInsuranceQualityAnalysisResult(
    id: InsuranceQualityAnalysisResultId,
    props: InsuranceQualityAnalysisResultEntity,
  ): TransactionType;
}
