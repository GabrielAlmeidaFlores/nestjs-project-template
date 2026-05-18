import type { NotFoundError } from '@core/error/not-found.error';
import type { GetTemporaryDisabilityBenefitsGrantWorkPeriodsQueryResult } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-work-periods/query/result/get-temporary-disability-benefits-grant-work-periods.query.result';
import type { TemporaryDisabilityBenefitsGrantWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/value-object/temporary-disability-benefits-grant-work-periods-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class TemporaryDisabilityBenefitsGrantWorkPeriodsQueryRepositoryGateway {
  public abstract findOneByTemporaryDisabilityBenefitsGrantWorkPeriodsIdOrFail(
    id: TemporaryDisabilityBenefitsGrantWorkPeriodsId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetTemporaryDisabilityBenefitsGrantWorkPeriodsQueryResult>;
}
