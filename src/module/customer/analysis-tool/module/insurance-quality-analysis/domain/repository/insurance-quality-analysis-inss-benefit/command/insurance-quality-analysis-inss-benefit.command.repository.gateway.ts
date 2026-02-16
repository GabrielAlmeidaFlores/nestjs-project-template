import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { InsuranceQualityAnalysisInssBenefitEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-inss-benefit/insurance-quality-analysis-inss-benefit.entity';
import type { InsuranceQualityAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-inss-benefit/value-object/insurance-quality-analysis-inss-benefit-id/insurance-quality-analysis-inss-benefit-id.value-object';

export abstract class InsuranceQualityAnalysisInssBenefitCommandRepositoryGateway {
  public abstract createInsuranceQualityAnalysisInssBenefit(
    entity: InsuranceQualityAnalysisInssBenefitEntity,
  ): TransactionType;

  public abstract deleteInsuranceQualityAnalysisInssBenefit(
    id: InsuranceQualityAnalysisInssBenefitId,
  ): TransactionType;
}
