import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-associated-cid/retirement-permanent-disability-revision-disability-analysis-associated-cid.entity';

export abstract class RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCid(
    props: RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntity,
  ): TransactionType;
}
