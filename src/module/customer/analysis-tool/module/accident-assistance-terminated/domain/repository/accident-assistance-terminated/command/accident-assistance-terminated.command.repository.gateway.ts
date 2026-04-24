import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AccidentAssistanceTerminatedEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/accident-assistance-terminated.entity';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';

export abstract class AccidentAssistanceTerminatedCommandRepositoryGateway {
  public abstract createAccidentAssistanceTerminated(
    props: AccidentAssistanceTerminatedEntity,
  ): TransactionType;

  public abstract updateAccidentAssistanceTerminated(
    id: AccidentAssistanceTerminatedId,
    props: AccidentAssistanceTerminatedEntity,
  ): TransactionType;

  public abstract updateAccidentAssistanceTerminatedEventContext(
    id: AccidentAssistanceTerminatedId,
    accidentDate: Date,
    accidentDescription: string,
    updatedBy: OrganizationMemberId,
  ): TransactionType;

  public abstract deleteAccidentAssistanceTerminated(
    id: AccidentAssistanceTerminatedId,
    updatedBy: OrganizationMemberId,
  ): TransactionType;
}
