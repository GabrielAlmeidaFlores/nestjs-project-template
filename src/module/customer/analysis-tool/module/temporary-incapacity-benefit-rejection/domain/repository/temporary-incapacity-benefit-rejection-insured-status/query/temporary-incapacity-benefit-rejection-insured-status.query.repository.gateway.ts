import type { NotFoundError } from '@core/error/not-found.error';
import type { TemporaryIncapacityBenefitRejectionInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status/value-object/temporary-incapacity-benefit-rejection-insured-status-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class TemporaryIncapacityBenefitRejectionInsuredStatusQueryRepositoryGateway {
  public abstract findOneByTemporaryIncapacityBenefitRejectionInsuredStatusIdOrFail(
    id: TemporaryIncapacityBenefitRejectionInsuredStatusId,
    err: ConstructorType<NotFoundError>,
  ): Promise<void>;
}
