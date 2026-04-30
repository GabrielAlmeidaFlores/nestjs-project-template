import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/value-object/temporary-disability-benefits-terminated-disability-analysis-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document/temporary-disability-benefits-terminated-disability-analysis-document.entity';

export abstract class TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocument(
    props: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId(
    temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId,
  ): TransactionType;
}
