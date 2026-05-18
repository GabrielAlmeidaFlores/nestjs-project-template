import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/retirement-permanent-disability-revision-disability-analysis.entity';

export abstract class RetirementPermanentDisabilityRevisionDisabilityAnalysisCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRevisionDisabilityAnalysis(
    props: RetirementPermanentDisabilityRevisionDisabilityAnalysisEntity,
  ): TransactionType;
}
