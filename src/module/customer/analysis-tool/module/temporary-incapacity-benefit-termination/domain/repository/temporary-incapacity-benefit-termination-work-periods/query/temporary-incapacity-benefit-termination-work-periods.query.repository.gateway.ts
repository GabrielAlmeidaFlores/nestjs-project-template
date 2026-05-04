import type { NotFoundError } from '@core/error/not-found.error';
import type { TemporaryIncapacityBenefitTerminationWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/value-object/temporary-incapacity-benefit-termination-work-periods-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class TemporaryIncapacityBenefitTerminationWorkPeriodsQueryRepositoryGateway {
  public abstract findOneByTemporaryIncapacityBenefitTerminationWorkPeriodsIdOrFail(
    id: TemporaryIncapacityBenefitTerminationWorkPeriodsId,
    err: ConstructorType<NotFoundError>,
  ): Promise<void>;
}
