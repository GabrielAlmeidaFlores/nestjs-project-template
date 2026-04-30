import type { NotFoundError } from '@core/error/not-found.error';
import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/value-object/temporary-disability-benefits-terminated-disability-analysis-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisQueryRepositoryGateway {
  public abstract findOneByTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisIdOrFail(
    id: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId,
    err: ConstructorType<NotFoundError>,
  ): Promise<void>;
}
