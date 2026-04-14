import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits/temporary-disability-benefits-grant-previous-benefits.entity';
import type { TemporaryDisabilityBenefitsGrantPreviousBenefitsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits/value-object/temporary-disability-benefits-grant-previous-benefits-id.value-object';

export abstract class TemporaryDisabilityBenefitsGrantPreviousBenefitsCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsGrantPreviousBenefits(
    props: TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity,
  ): TransactionType;

  public abstract deleteTemporaryDisabilityBenefitsGrantPreviousBenefits(
    id: TemporaryDisabilityBenefitsGrantPreviousBenefitsId,
  ): TransactionType;
}
