import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/temporary-disability-benefits-terminated-disability-analysis.entity';

export abstract class TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsTerminatedDisabilityAnalysis(
    props: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryDisabilityBenefitsTerminatedId(
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
  ): TransactionType;
}
