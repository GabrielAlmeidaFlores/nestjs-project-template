import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { AccidentAssistanceTerminatedResultEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-result/accident-assistance-terminated-result.entity';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';

export abstract class AccidentAssistanceTerminatedResultCommandRepositoryGateway {
  public abstract createAccidentAssistanceTerminatedResult(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    props: AccidentAssistanceTerminatedResultEntity,
  ): TransactionType;

  public abstract updateAccidentAssistanceTerminatedResultDecisionDetails(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    props: AccidentAssistanceTerminatedResultEntity,
  ): TransactionType;

  public abstract updateAccidentAssistanceTerminatedResultFirstAnalysis(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    props: AccidentAssistanceTerminatedResultEntity,
  ): TransactionType;
}
