import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AccidentBenefitRejectionDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/accident-benefit-rejection-document.entity';
import type { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';

export abstract class AccidentBenefitRejectionDocumentCommandRepositoryGateway {
  public abstract createAccidentBenefitRejectionDocument(
    props: AccidentBenefitRejectionDocumentEntity,
  ): TransactionType;

  public abstract deleteAllAccidentBenefitRejectionDocumentByAccidentBenefitRejectionId(
    id: AccidentBenefitRejectionId,
  ): TransactionType;
}
