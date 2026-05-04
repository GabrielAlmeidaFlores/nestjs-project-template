import type { NotFoundError } from '@core/error/not-found.error';
import type { TemporaryIncapacityBenefitTerminationDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/value-object/temporary-incapacity-benefit-termination-disability-analysis-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class TemporaryIncapacityBenefitTerminationDisabilityAnalysisQueryRepositoryGateway {
  public abstract findOneByTemporaryIncapacityBenefitTerminationDisabilityAnalysisIdOrFail(
    id: TemporaryIncapacityBenefitTerminationDisabilityAnalysisId,
    err: ConstructorType<NotFoundError>,
  ): Promise<void>;
}
