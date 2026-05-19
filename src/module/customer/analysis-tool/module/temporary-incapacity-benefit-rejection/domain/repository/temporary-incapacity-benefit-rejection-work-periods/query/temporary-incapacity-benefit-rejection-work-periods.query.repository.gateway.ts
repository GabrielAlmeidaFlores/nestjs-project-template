import type { NotFoundError } from '@core/error/not-found.error';
import type { TemporaryIncapacityBenefitRejectionWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/value-object/temporary-incapacity-benefit-rejection-work-periods-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class TemporaryIncapacityBenefitRejectionWorkPeriodsQueryRepositoryGateway {
  public abstract findOneByTemporaryIncapacityBenefitRejectionWorkPeriodsIdOrFail(
    id: TemporaryIncapacityBenefitRejectionWorkPeriodsId,
    err: ConstructorType<NotFoundError>,
  ): Promise<void>;
}
