import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/value-object/temporary-disability-benefits-terminated-disability-analysis-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-cid/temporary-disability-benefits-terminated-disability-analysis-cid.entity';

export abstract class TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCid(
    props: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId(
    temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId,
  ): TransactionType;
}
