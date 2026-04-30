import type { NotFoundError } from '@core/error/not-found.error';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/value-object/temporary-disability-benefits-terminated-work-periods-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class TemporaryDisabilityBenefitsTerminatedWorkPeriodsQueryRepositoryGateway {
  public abstract findOneByTemporaryDisabilityBenefitsTerminatedWorkPeriodsIdOrFail(
    id: TemporaryDisabilityBenefitsTerminatedWorkPeriodsId,
    err: ConstructorType<NotFoundError>,
  ): Promise<void>;
}
