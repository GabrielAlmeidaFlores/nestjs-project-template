import type { NotFoundError } from '@core/error/not-found.error';
import type { PermanentIncapacityBenefitTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status/value-object/permanent-incapacity-benefit-terminated-insured-status-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class PermanentIncapacityBenefitTerminatedInsuredStatusQueryRepositoryGateway {
  public abstract findOneByPermanentIncapacityBenefitTerminatedInsuredStatusIdOrFail(
    id: PermanentIncapacityBenefitTerminatedInsuredStatusId,
    err: ConstructorType<NotFoundError>,
  ): Promise<void>;
}
