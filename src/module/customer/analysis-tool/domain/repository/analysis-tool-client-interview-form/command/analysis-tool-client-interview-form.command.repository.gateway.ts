import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AnalysisToolClientInterviewFormEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-interview-form/analysis-tool-client-interview-form.entity';
import type { AnalysisToolClientInterviewFormId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-interview-form/value-object/analysis-tool-client-interview-form-id/analysis-tool-client-interview-form-id.value-object';

export abstract class AnalysisToolClientInterviewFormCommandRepositoryGateway {
  public abstract createAnalysisToolClientInterviewForm(
    props: AnalysisToolClientInterviewFormEntity,
  ): TransactionType;

  public abstract updateAnalysisToolClientInterviewForm(
    id: AnalysisToolClientInterviewFormId,
    props: AnalysisToolClientInterviewFormEntity,
  ): TransactionType;
}
