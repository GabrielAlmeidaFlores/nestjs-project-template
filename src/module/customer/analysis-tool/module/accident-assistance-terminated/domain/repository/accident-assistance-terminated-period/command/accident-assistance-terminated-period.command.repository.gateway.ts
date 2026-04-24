import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import type { AccidentAssistanceTerminatedPeriodEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/accident-assistance-terminated-period.entity';
import type { AccidentAssistanceTerminatedPeriodId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/value-object/accident-assistance-terminated-period-id/accident-assistance-terminated-period-id.value-object';

export abstract class AccidentAssistanceTerminatedPeriodCommandRepositoryGateway {
  public abstract createAccidentAssistanceTerminatedPeriod(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    props: AccidentAssistanceTerminatedPeriodEntity,
  ): TransactionType;

  public abstract updateAccidentAssistanceTerminatedPeriod(
    id: AccidentAssistanceTerminatedPeriodId,
    props: AccidentAssistanceTerminatedPeriodEntity,
  ): TransactionType;

  public abstract deleteAccidentAssistanceTerminatedPeriod(
    id: AccidentAssistanceTerminatedPeriodId,
  ): TransactionType;

  public abstract deleteAccidentAssistanceTerminatedPeriodsByAccidentAssistanceTerminatedId(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
  ): TransactionType;
}
