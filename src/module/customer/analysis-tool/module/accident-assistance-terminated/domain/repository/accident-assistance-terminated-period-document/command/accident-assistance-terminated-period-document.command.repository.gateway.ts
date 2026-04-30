import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AccidentAssistanceTerminatedPeriodId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/value-object/accident-assistance-terminated-period-id/accident-assistance-terminated-period-id.value-object';
import type { AccidentAssistanceTerminatedPeriodDocumentEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period-document/accident-assistance-terminated-period-document.entity';

export abstract class AccidentAssistanceTerminatedPeriodDocumentCommandRepositoryGateway {
  public abstract createAccidentAssistanceTerminatedPeriodDocument(
    props: AccidentAssistanceTerminatedPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteAllAccidentAssistanceTerminatedPeriodDocumentsByAccidentAssistanceTerminatedPeriodId(
    accidentAssistanceTerminatedPeriodId: AccidentAssistanceTerminatedPeriodId,
  ): TransactionType;
}
