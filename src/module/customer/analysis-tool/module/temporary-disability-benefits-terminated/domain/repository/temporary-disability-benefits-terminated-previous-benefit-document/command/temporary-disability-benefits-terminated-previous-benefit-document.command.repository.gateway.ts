import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document/temporary-disability-benefits-terminated-previous-benefit-document.entity';
import type { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document/value-object/temporary-disability-benefits-terminated-previous-benefit-document-id.value-object';

export abstract class TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsTerminatedPreviousBenefitDocument(
    props: TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntity,
  ): TransactionType;

  public abstract deleteTemporaryDisabilityBenefitsTerminatedPreviousBenefitDocument(
    id: TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentId,
  ): TransactionType;
}
