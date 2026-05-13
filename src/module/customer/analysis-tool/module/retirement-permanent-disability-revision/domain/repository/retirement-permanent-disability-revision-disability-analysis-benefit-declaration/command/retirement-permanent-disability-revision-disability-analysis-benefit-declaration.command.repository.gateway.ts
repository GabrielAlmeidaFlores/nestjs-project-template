import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-declaration/retirement-permanent-disability-revision-disability-analysis-benefit-declaration.entity';

export abstract class RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclaration(
    props: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntity,
  ): TransactionType;
}
