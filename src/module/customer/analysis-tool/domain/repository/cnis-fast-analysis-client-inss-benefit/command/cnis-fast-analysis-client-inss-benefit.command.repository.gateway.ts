import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CnisFastAnalysisClientInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/cnis-fast-analysis-client-inss-benefit.entity';
import type { CnisFastAnalysisClientInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/value-object/cnis-fast-analysis-client-inss-benefit-id/cnis-fast-analysis-client-inss-benefit-id.value-object';

export abstract class CnisFastAnalysisClientInssBenefitCommandRepositoryGateway {
  public abstract createCnisFastAnalysisClientInssBenefit(
    props: CnisFastAnalysisClientInssBenefitEntity,
  ): TransactionType;

  public abstract deleteCnisFastAnalysisClientInssBenefit(
    id: CnisFastAnalysisClientInssBenefitId,
  ): TransactionType;
}
