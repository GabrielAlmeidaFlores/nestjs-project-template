import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsGrantEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/temporary-disability-benefits-grant.entity';
import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-result/value-object/temporary-disability-benefits-grant-result-id.value-object';

export abstract class TemporaryDisabilityBenefitsGrantCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsGrant(
    props: TemporaryDisabilityBenefitsGrantEntity,
  ): TransactionType;

  public abstract updateTemporaryDisabilityBenefitsGrant(
    id: TemporaryDisabilityBenefitsGrantId,
    props: TemporaryDisabilityBenefitsGrantEntity,
  ): TransactionType;

  public abstract updateTemporaryDisabilityBenefitsGrantResultId(
    id: TemporaryDisabilityBenefitsGrantId,
    resultId: TemporaryDisabilityBenefitsGrantResultId,
  ): TransactionType;
}
