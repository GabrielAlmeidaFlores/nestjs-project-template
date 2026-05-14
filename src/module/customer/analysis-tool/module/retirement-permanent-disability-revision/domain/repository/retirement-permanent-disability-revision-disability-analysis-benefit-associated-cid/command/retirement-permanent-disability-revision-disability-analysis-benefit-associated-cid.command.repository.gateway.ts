import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid.entity';

export abstract class RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCid(
    props: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntity,
  ): TransactionType;
}
