import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-document/temporary-disability-benefits-grant-document.entity';
import type { TemporaryDisabilityBenefitsGrantDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-document/value-object/temporary-disability-benefits-grant-document-id.value-object';

export abstract class TemporaryDisabilityBenefitsGrantDocumentCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsGrantDocument(
    props: TemporaryDisabilityBenefitsGrantDocumentEntity,
  ): TransactionType;

  public abstract deleteTemporaryDisabilityBenefitsGrantDocument(
    id: TemporaryDisabilityBenefitsGrantDocumentId,
  ): TransactionType;

  public abstract deleteAllByTemporaryDisabilityBenefitsGrantId(
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
  ): TransactionType;
}
