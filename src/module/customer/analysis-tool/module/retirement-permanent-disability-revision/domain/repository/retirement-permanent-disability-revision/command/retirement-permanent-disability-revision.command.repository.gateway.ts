import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRevisionEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/retirement-permanent-disability-revision.entity';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';

export abstract class RetirementPermanentDisabilityRevisionCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRevision(
    entity: RetirementPermanentDisabilityRevisionEntity,
  ): TransactionType;

  public abstract updateRetirementPermanentDisabilityRevision(
    id: RetirementPermanentDisabilityRevisionId,
    entity: RetirementPermanentDisabilityRevisionEntity,
  ): TransactionType;
}
