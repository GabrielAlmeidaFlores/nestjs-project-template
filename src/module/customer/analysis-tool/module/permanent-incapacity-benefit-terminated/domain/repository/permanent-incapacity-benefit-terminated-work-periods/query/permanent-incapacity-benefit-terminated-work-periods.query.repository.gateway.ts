import type { NotFoundError } from '@core/error/not-found.error';
import type { PermanentIncapacityBenefitTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/value-object/permanent-incapacity-benefit-terminated-work-periods-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class PermanentIncapacityBenefitTerminatedWorkPeriodsQueryRepositoryGateway {
  public abstract findOneByPermanentIncapacityBenefitTerminatedWorkPeriodsIdOrFail(
    id: PermanentIncapacityBenefitTerminatedWorkPeriodsId,
    err: ConstructorType<NotFoundError>,
  ): Promise<void>;
}
