import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { LegalPleadingDocumentAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document-analysis/legal-pleading-document-analysis.entity';

export abstract class LegalPleadingDocumentAnalysisCommandRepositoryGateway {
  public abstract createLegalPleadingDocumentAnalysis(
    props: LegalPleadingDocumentAnalysisEntity,
  ): TransactionType;
}
