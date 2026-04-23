import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { AccidentAssistanceTerminatedBenefitEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-benefit/accident-assistance-terminated-benefit.entity';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';

export abstract class AccidentAssistanceTerminatedBenefitCommandRepositoryGateway {
  public abstract createAccidentAssistanceTerminatedBenefit(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    props: AccidentAssistanceTerminatedBenefitEntity,
  ): TransactionType;

  public abstract deleteAccidentAssistanceTerminatedBenefitByAccidentAssistanceTerminatedId(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
  ): TransactionType;
}
