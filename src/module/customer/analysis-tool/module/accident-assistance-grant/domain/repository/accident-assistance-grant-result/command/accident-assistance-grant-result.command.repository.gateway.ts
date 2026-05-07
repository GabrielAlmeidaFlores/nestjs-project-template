import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AccidentAssistanceGrantResultEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-result/accident-assistance-grant-result.entity';

export abstract class AccidentAssistanceGrantResultCommandRepositoryGateway {
  public abstract createAccidentAssistanceGrantResult(
    props: AccidentAssistanceGrantResultEntity,
  ): TransactionType;

  public abstract updateAccidentAssistanceGrantResult(
    props: AccidentAssistanceGrantResultEntity,
  ): TransactionType;
}
