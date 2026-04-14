import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits-document/temporary-disability-benefits-grant-previous-benefits-document.entity';
import type { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits-document/value-object/temporary-disability-benefits-grant-previous-benefits-document-id.value-object';

export abstract class TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsGrantPreviousBenefitsDocument(
    props: TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity,
  ): TransactionType;

  public abstract deleteTemporaryDisabilityBenefitsGrantPreviousBenefitsDocument(
    id: TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentId,
  ): TransactionType;
}
