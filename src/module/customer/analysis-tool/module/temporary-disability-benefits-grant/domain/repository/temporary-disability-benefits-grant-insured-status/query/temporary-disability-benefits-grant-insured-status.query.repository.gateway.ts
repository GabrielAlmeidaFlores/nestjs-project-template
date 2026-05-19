import type { NotFoundError } from '@core/error/not-found.error';
import type { GetTemporaryDisabilityBenefitsGrantInsuredStatusQueryResult } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-insured-status/query/result/get-temporary-disability-benefits-grant-insured-status.query.result';
import type { TemporaryDisabilityBenefitsGrantInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/value-object/temporary-disability-benefits-grant-insured-status-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class TemporaryDisabilityBenefitsGrantInsuredStatusQueryRepositoryGateway {
  public abstract findOneByTemporaryDisabilityBenefitsGrantInsuredStatusIdOrFail(
    id: TemporaryDisabilityBenefitsGrantInsuredStatusId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetTemporaryDisabilityBenefitsGrantInsuredStatusQueryResult>;
}
