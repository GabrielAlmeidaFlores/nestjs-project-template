import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import type { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';

export abstract class AnalysisToolRecordCommandRepositoryGateway {
  public abstract createAnalysisToolRecord(
    props: AnalysisToolRecordEntity,
  ): TransactionType;

  public abstract deleteAnalysisToolRecord(
    id: AnalysisToolRecordId,
  ): TransactionType;
}
