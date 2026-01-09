import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AnalysisToolClientLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.entity';
import type { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';

export abstract class AnalysisToolClientLegalProceedingCommandRepositoryGateway {
  public abstract createAnalysisToolClientLegalProceeding(
    props: AnalysisToolClientLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteAnalysisToolClientLegalProceeding(
    id: AnalysisToolClientLegalProceedingId,
  ): TransactionType;

  public abstract updateAnalysisToolClientLegalProceeding(
    id: AnalysisToolClientLegalProceedingId,
    props: AnalysisToolClientLegalProceedingEntity,
  ): TransactionType;
}
