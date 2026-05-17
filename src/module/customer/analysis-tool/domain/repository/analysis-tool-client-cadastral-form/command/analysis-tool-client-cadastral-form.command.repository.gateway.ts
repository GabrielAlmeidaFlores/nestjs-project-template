import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AnalysisToolClientCadastralFormEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-cadastral-form/analysis-tool-client-cadastral-form.entity';
import type { AnalysisToolClientCadastralFormId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-cadastral-form/value-object/analysis-tool-client-cadastral-form-id/analysis-tool-client-cadastral-form-id.value-object';

export abstract class AnalysisToolClientCadastralFormCommandRepositoryGateway {
  public abstract createAnalysisToolClientCadastralForm(
    props: AnalysisToolClientCadastralFormEntity,
  ): TransactionType;

  public abstract updateAnalysisToolClientCadastralForm(
    id: AnalysisToolClientCadastralFormId,
    props: AnalysisToolClientCadastralFormEntity,
  ): TransactionType;
}
