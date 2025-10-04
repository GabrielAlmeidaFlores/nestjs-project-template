import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';

export abstract class AnalysisToolClientCommandRepositoryGateway {
  public abstract createAnalysisToolClient(
    props: AnalysisToolClientEntity,
  ): TransactionType;

  public abstract updateAnalysisToolClient(
    id: AnalysisToolClientId,
    props: AnalysisToolClientEntity,
  ): TransactionType;
}
