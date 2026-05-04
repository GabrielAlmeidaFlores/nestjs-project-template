import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status/value-object/temporary-disability-benefits-terminated-insured-status-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status-document/temporary-disability-benefits-terminated-insured-status-document.entity';

export abstract class TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsTerminatedInsuredStatusDocument(
    props: TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryDisabilityBenefitsTerminatedInsuredStatusId(
    temporaryDisabilityBenefitsTerminatedInsuredStatusId: TemporaryDisabilityBenefitsTerminatedInsuredStatusId,
  ): TransactionType;
}
