import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRevisionResultEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/retirement-permanent-disability-revision-result.entity';
import type { RetirementPermanentDisabilityRevisionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/value-object/retirement-permanent-disability-revision-result-id/retirement-permanent-disability-revision-result-id.value-object';

export abstract class RetirementPermanentDisabilityRevisionResultCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRevisionResult(
    props: RetirementPermanentDisabilityRevisionResultEntity,
  ): TransactionType;

  public abstract updateRetirementPermanentDisabilityRevisionResult(
    id: RetirementPermanentDisabilityRevisionResultId,
    props: RetirementPermanentDisabilityRevisionResultEntity,
  ): TransactionType;
}
