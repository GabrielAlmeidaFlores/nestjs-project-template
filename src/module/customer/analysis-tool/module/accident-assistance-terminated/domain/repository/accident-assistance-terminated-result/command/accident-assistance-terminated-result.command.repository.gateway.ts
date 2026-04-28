import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import type { AccidentAssistanceTerminatedResultEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-result/accident-assistance-terminated-result.entity';
import type { AccidentAssistanceTerminatedResultId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-result/value-object/accident-assistance-terminated-result-id/accident-assistance-terminated-result-id.value-object';

export abstract class AccidentAssistanceTerminatedResultCommandRepositoryGateway {
  public abstract createAccidentAssistanceTerminatedResult(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    props: AccidentAssistanceTerminatedResultEntity,
  ): TransactionType;

  public abstract updateAccidentAssistanceTerminatedResult(
    id: AccidentAssistanceTerminatedResultId,
    props: AccidentAssistanceTerminatedResultEntity,
  ): TransactionType;

  public abstract updateAccidentAssistanceTerminatedResultFirstAnalysis(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    props: AccidentAssistanceTerminatedResultEntity,
  ): TransactionType;
}
