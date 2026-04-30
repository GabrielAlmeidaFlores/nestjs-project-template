import type { NotFoundError } from '@core/error/not-found.error';
import type { TemporaryIncapacityBenefitTerminationInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status/value-object/temporary-incapacity-benefit-termination-insured-status-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class TemporaryIncapacityBenefitTerminationInsuredStatusQueryRepositoryGateway {
  public abstract findOneByTemporaryIncapacityBenefitTerminationInsuredStatusIdOrFail(
    id: TemporaryIncapacityBenefitTerminationInsuredStatusId,
    err: ConstructorType<NotFoundError>,
  ): Promise<void>;
}
