import type { NotFoundError } from '@core/error/not-found.error';
import type { TemporaryDisabilityBenefitsTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status/value-object/temporary-disability-benefits-terminated-insured-status-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class TemporaryDisabilityBenefitsTerminatedInsuredStatusQueryRepositoryGateway {
  public abstract findOneByTemporaryDisabilityBenefitsTerminatedInsuredStatusIdOrFail(
    id: TemporaryDisabilityBenefitsTerminatedInsuredStatusId,
    err: ConstructorType<NotFoundError>,
  ): Promise<void>;
}
