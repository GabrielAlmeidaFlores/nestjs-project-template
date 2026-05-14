import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRejectionIncapacityEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/retirement-permanent-disability-rejection-incapacity.entity';
import type { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';

export abstract class RetirementPermanentDisabilityRejectionIncapacityCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRejectionIncapacity(
    props: RetirementPermanentDisabilityRejectionIncapacityEntity,
  ): TransactionType;

  public abstract updateRetirementPermanentDisabilityRejectionIncapacity(
    id: RetirementPermanentDisabilityRejectionIncapacityId,
    props: RetirementPermanentDisabilityRejectionIncapacityEntity,
  ): TransactionType;
}
