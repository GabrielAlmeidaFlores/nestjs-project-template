import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import type { RetirementPermanentDisabilityRejectionIncapacityCidEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-cid/retirement-permanent-disability-rejection-incapacity-cid.entity';

export abstract class RetirementPermanentDisabilityRejectionIncapacityCidCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRejectionIncapacityCid(
    props: RetirementPermanentDisabilityRejectionIncapacityCidEntity,
  ): TransactionType;

  public abstract deleteAllRetirementPermanentDisabilityRejectionIncapacityCidsByIncapacityId(
    incapacityId: RetirementPermanentDisabilityRejectionIncapacityId,
  ): TransactionType;
}
