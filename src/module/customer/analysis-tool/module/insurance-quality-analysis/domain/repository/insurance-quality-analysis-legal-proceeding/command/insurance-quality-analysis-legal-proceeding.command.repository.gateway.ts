import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { InsuranceQualityAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-legal-proceeding/insurance-quality-analysis-legal-proceeding.entity';
import type { InsuranceQualityAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-legal-proceeding/value-object/insurance-quality-analysis-legal-proceeding-id/insurance-quality-analysis-legal-proceeding-id.value-object';

export abstract class InsuranceQualityAnalysisLegalProceedingCommandRepositoryGateway {
  public abstract createInsuranceQualityAnalysisLegalProceeding(
    entity: InsuranceQualityAnalysisLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteInsuranceQualityAnalysisLegalProceeding(
    id: InsuranceQualityAnalysisLegalProceedingId,
  ): TransactionType;
}
