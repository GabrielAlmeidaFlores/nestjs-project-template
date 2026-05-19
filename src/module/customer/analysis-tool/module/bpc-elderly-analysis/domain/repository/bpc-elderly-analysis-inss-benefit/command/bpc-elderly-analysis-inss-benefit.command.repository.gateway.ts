import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcElderlyAnalysisInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-inss-benefit/bpc-elderly-analysis-inss-benefit.entity';
import type { BpcElderlyAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-inss-benefit/value-object/bpc-elderly-analysis-inss-benefit-id/bpc-elderly-analysis-inss-benefit-id.value-object';

export abstract class BpcElderlyAnalysisInssBenefitCommandRepositoryGateway {
  public abstract createBpcElderlyAnalysisInssBenefit(
    props: BpcElderlyAnalysisInssBenefitEntity,
  ): TransactionType;

  public abstract deleteBpcElderlyAnalysisInssBenefit(
    id: BpcElderlyAnalysisInssBenefitId,
  ): TransactionType;
}
