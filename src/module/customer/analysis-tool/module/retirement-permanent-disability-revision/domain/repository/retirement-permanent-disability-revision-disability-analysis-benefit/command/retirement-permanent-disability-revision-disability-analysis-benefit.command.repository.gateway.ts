import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit/retirement-permanent-disability-revision-disability-analysis-benefit.entity';

export abstract class RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRevisionDisabilityAnalysisBenefit(
    props: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntity,
  ): TransactionType;
}
