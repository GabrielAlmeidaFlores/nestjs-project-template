import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import type { AccidentAssistanceTerminatedCidEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-cid/accident-assistance-terminated-cid.entity';

export abstract class AccidentAssistanceTerminatedCidCommandRepositoryGateway {
  public abstract createAccidentAssistanceTerminatedCid(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    props: AccidentAssistanceTerminatedCidEntity,
  ): TransactionType;

  public abstract deleteAccidentAssistanceTerminatedCidByAccidentAssistanceTerminatedId(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
  ): TransactionType;
}
