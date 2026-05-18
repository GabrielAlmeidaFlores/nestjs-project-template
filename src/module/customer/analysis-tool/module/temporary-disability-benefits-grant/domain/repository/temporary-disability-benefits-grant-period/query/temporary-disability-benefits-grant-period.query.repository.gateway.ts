import type { NotFoundError } from '@core/error/not-found.error';
import type { GetTemporaryDisabilityBenefitsGrantPeriodQueryResult } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-period/query/result/get-temporary-disability-benefits-grant-period.query.result';
import type { TemporaryDisabilityBenefitsGrantPeriodId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/value-object/temporary-disability-benefits-grant-period-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class TemporaryDisabilityBenefitsGrantPeriodQueryRepositoryGateway {
  public abstract findOneByTemporaryDisabilityBenefitsGrantPeriodIdOrFail(
    id: TemporaryDisabilityBenefitsGrantPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetTemporaryDisabilityBenefitsGrantPeriodQueryResult>;
}
