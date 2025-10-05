import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CnisFastAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-legal-proceeding/cnis-fast-analysis-legal-proceeding.entity';
import type { CnisFastAnalysisLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-legal-proceeding/value-object/cnis-fast-analysis-legal-proceeding-id/cnis-fast-analysis-legal-proceeding-id.value-object';

export abstract class CnisFastAnalysisLegalProceedingCommandRepositoryGateway {
  public abstract createCnisFastAnalysisLegalProceeding(
    props: CnisFastAnalysisLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteCnisFastAnalysisLegalProceeding(
    id: CnisFastAnalysisLegalProceedingId,
  ): TransactionType;
}
