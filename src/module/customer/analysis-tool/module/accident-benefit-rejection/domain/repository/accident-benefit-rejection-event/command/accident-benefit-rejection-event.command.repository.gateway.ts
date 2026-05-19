import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import type { AccidentBenefitRejectionEventEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event/accident-benefit-rejection-event.entity';

export abstract class AccidentBenefitRejectionEventCommandRepositoryGateway {
  public abstract createAccidentBenefitRejectionEvent(
    props: AccidentBenefitRejectionEventEntity,
  ): TransactionType;

  public abstract deleteAllAccidentBenefitRejectionEventByAccidentBenefitRejectionId(
    id: AccidentBenefitRejectionId,
  ): TransactionType;
}
