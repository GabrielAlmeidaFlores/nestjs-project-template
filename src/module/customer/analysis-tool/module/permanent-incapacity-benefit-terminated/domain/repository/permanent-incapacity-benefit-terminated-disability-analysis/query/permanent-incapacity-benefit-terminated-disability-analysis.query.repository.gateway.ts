import type { NotFoundError } from '@core/error/not-found.error';
import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/value-object/permanent-incapacity-benefit-terminated-disability-analysis-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class PermanentIncapacityBenefitTerminatedDisabilityAnalysisQueryRepositoryGateway {
  public abstract findOneByPermanentIncapacityBenefitTerminatedDisabilityAnalysisIdOrFail(
    id: PermanentIncapacityBenefitTerminatedDisabilityAnalysisId,
    err: ConstructorType<NotFoundError>,
  ): Promise<void>;
}
