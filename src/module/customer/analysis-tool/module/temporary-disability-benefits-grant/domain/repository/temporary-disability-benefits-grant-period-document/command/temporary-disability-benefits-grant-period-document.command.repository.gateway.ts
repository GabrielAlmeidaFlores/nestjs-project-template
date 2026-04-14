import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period-document/temporary-disability-benefits-grant-period-document.entity';
import type { TemporaryDisabilityBenefitsGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period-document/value-object/temporary-disability-benefits-grant-period-document-id.value-object';

export abstract class TemporaryDisabilityBenefitsGrantPeriodDocumentCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsGrantPeriodDocument(
    props: TemporaryDisabilityBenefitsGrantPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteTemporaryDisabilityBenefitsGrantPeriodDocument(
    id: TemporaryDisabilityBenefitsGrantPeriodDocumentId,
  ): TransactionType;
}
