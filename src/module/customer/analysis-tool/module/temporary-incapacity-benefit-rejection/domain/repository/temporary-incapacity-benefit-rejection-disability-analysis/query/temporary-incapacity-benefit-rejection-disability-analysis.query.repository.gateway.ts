import type { NotFoundError } from '@core/error/not-found.error';
import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/value-object/temporary-incapacity-benefit-rejection-disability-analysis-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class TemporaryIncapacityBenefitRejectionDisabilityAnalysisQueryRepositoryGateway {
  public abstract findOneByTemporaryIncapacityBenefitRejectionDisabilityAnalysisIdOrFail(
    id: TemporaryIncapacityBenefitRejectionDisabilityAnalysisId,
    err: ConstructorType<NotFoundError>,
  ): Promise<void>;
}
