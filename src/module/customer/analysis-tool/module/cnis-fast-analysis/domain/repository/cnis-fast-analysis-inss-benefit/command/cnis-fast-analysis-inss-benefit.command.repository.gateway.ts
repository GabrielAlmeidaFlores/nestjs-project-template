import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CnisFastAnalysisInssBenefitEntity } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-inss-benefit/cnis-fast-analysis-inss-benefit.entity';
import type { CnisFastAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-inss-benefit/value-object/cnis-fast-analysis-inss-benefit-id/cnis-fast-analysis-inss-benefit-id.value-object';

export abstract class CnisFastAnalysisInssBenefitCommandRepositoryGateway {
  public abstract createAnalysisToolClientInssBenefit(
    props: CnisFastAnalysisInssBenefitEntity,
  ): TransactionType;

  public abstract deleteAnalysisToolClientInssBenefit(
    id: CnisFastAnalysisInssBenefitId,
  ): TransactionType;
}
