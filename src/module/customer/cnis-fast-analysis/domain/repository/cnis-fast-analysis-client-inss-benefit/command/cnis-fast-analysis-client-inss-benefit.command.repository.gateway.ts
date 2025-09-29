import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CnisFastAnalysisClientInssBenefitEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/cnis-fast-analysis-client-inss-benefit.entity';

export abstract class CnisFastAnalysisClientInssBenefitCommandRepositoryGateway {
  public abstract createCnisFastAnalysisClientInssBenefit(
    props: CnisFastAnalysisClientInssBenefitEntity,
  ): TransactionType;
}
