import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcElderlyAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-legal-proceeding/bpc-elderly-analysis-legal-proceeding.entity';
import type { BpcElderlyAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-legal-proceeding/value-object/bpc-elderly-analysis-legal-proceeding-id/bpc-elderly-analysis-legal-proceeding-id.value-object';

export abstract class BpcElderlyAnalysisLegalProceedingCommandRepositoryGateway {
  public abstract createBpcElderlyAnalysisLegalProceeding(
    props: BpcElderlyAnalysisLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteBpcElderlyAnalysisLegalProceeding(
    id: BpcElderlyAnalysisLegalProceedingId,
  ): TransactionType;
}
