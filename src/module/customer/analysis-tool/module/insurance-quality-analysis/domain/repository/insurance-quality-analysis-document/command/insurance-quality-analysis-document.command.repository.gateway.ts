import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { InsuranceQualityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-document/insurance-quality-analysis-document.entity';
import type { InsuranceQualityAnalysisDocumentId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-document/value-object/insurance-quality-analysis-document-id/insurance-quality-analysis-document-id.value-object';

export abstract class InsuranceQualityAnalysisDocumentCommandRepositoryGateway {
  public abstract createInsuranceQualityAnalysisDocument(
    props: InsuranceQualityAnalysisDocumentEntity,
  ): TransactionType;

  public abstract deleteInsuranceQualityAnalysisDocument(
    id: InsuranceQualityAnalysisDocumentId,
  ): TransactionType;
}
