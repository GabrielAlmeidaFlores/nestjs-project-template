import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import type { AccidentAssistanceTerminatedDocumentEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/accident-assistance-terminated-document.entity';

export abstract class AccidentAssistanceTerminatedDocumentCommandRepositoryGateway {
  public abstract createAccidentAssistanceTerminatedDocument(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    props: AccidentAssistanceTerminatedDocumentEntity,
  ): TransactionType;

  public abstract deleteAccidentAssistanceTerminatedDocumentByAccidentAssistanceTerminatedId(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
  ): TransactionType;
}
