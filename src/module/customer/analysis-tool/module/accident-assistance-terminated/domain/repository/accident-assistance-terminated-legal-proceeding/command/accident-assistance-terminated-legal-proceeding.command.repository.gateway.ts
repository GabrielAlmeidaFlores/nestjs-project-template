import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { AccidentAssistanceTerminatedLegalProceedingEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-legal-proceeding/accident-assistance-terminated-legal-proceeding.entity';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';

export abstract class AccidentAssistanceTerminatedLegalProceedingCommandRepositoryGateway {
  public abstract createAccidentAssistanceTerminatedLegalProceeding(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    props: AccidentAssistanceTerminatedLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteAccidentAssistanceTerminatedLegalProceedingByAccidentAssistanceTerminatedId(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
  ): TransactionType;
}
