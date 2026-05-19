import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status-document/temporary-disability-benefits-grant-insured-status-document.entity';
import type { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status-document/value-object/temporary-disability-benefits-grant-insured-status-document-id.value-object';

export abstract class TemporaryDisabilityBenefitsGrantInsuredStatusDocumentCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsGrantInsuredStatusDocument(
    props: TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity,
  ): TransactionType;

  public abstract deleteTemporaryDisabilityBenefitsGrantInsuredStatusDocument(
    id: TemporaryDisabilityBenefitsGrantInsuredStatusDocumentId,
  ): TransactionType;
}
