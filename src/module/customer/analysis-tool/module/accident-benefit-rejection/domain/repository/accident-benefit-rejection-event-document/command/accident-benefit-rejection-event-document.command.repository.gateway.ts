import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AccidentBenefitRejectionEventId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event/value-object/accident-benefit-rejection-event-id.value-object';
import type { AccidentBenefitRejectionEventDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event-document/accident-benefit-rejection-event-document.entity';

export abstract class AccidentBenefitRejectionEventDocumentCommandRepositoryGateway {
  public abstract createAccidentBenefitRejectionEventDocument(
    props: AccidentBenefitRejectionEventDocumentEntity,
  ): TransactionType;

  public abstract deleteAllAccidentBenefitRejectionEventDocumentByAccidentBenefitRejectionEventId(
    id: AccidentBenefitRejectionEventId,
  ): TransactionType;
}
