import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CnisFastAnalysisClientLegalProceedingEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client-legal-proceeding/cnis-fast-analysis-client-legal-proceeding.entity';
import type { CnisFastAnalysisClientLegalProceedingId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client-legal-proceeding/value-object/cnis-fast-analysis-client-legal-proceeding-id/cnis-fast-analysis-client-legal-proceeding-id.value-object';

export abstract class CnisFastAnalysisClientLegalProceedingCommandRepositoryGateway {
  public abstract createCnisFastAnalysisClientLegalProceeding(
    props: CnisFastAnalysisClientLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteCnisFastAnalysisClientLegalProceeding(
    id: CnisFastAnalysisClientLegalProceedingId,
  ): TransactionType;
}
