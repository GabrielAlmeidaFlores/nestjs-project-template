import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-document/retirement-permanent-disability-revision-disability-analysis-document.entity';

export abstract class RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRevisionDisabilityAnalysisDocument(
    props: RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntity,
  ): TransactionType;
}
