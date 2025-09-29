import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CnisFastAnalysisClientLegalProceedingEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client-legal-proceeding/cnis-fast-analysis-client-legal-proceeding.entity';

export abstract class CnisFastAnalysisClientLegalProceedingCommandRepositoryGateway {
  public abstract createCnisFastAnalysisClientLegalProceeding(
    props: CnisFastAnalysisClientLegalProceedingEntity,
  ): TransactionType;
}
