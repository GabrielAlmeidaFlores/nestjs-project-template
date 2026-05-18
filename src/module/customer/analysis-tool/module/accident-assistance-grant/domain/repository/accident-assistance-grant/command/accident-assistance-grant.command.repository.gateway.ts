import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AccidentAssistanceGrantEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/accident-assistance-grant.entity';
import type { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import type { AccidentAssistanceGrantResultId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-result/value-object/accident-assistance-grant-result-id.value-object';

export abstract class AccidentAssistanceGrantCommandRepositoryGateway {
  public abstract createAccidentAssistanceGrant(
    props: AccidentAssistanceGrantEntity,
  ): TransactionType;

  public abstract updateAccidentAssistanceGrant(
    id: AccidentAssistanceGrantId,
    props: AccidentAssistanceGrantEntity,
  ): TransactionType;

  public abstract updateAccidentAssistanceGrantResultId(
    id: AccidentAssistanceGrantId,
    resultId: AccidentAssistanceGrantResultId,
  ): TransactionType;
}
